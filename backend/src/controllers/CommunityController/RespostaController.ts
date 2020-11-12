import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import NotificationModel from '../../models/UsersModel/NotificationModel'

import RespostaModel from '../../models/CommunityModel/RespostaModel'
import TopicoModel from '../../models/CommunityModel/TopicoModel'

import FormatDate from '../../utils/FormatDate'
import nowDateUTC from '../../utils/nowDateUTC'

class TopicoController {
  private _topicoModel = new TopicoModel()
  private _respostaModel = new RespostaModel()
  private _userModel = new UserModel()
  private _notificationModel = new NotificationModel()
  
  public index = async (req: Request, res: Response) => {
    const { pages, order } = req.query
    const { id_topico_comunidade } = req.params

    let respostas = await this._respostaModel.indexResposta(Number(pages), String(order), Number(id_topico_comunidade))

    respostas = respostas.map(resposta => {
      resposta.data_publicacao = FormatDate(resposta.data_publicacao)
      
      return resposta
    })

    return res.json(respostas)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { conteudo } = req.body
    
    if(!conteudo) return res.status(401).json({ error: 'Please, inform answer content' })

    const data = this.factoryContent(userId, conteudo, Number(id_topico_comunidade))

    try {
      const id = await this._respostaModel.createResposta(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._topicoModel.getUserPublication(Number(id_topico_comunidade))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, respondeu o seu post!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { conteudo } = req.body
    
    const existsTopico = await this._topicoModel.existsTopico(Number(id_topico_comunidade))

    if(!existsTopico) return res.status(404).json({ error: 'Topic not Found' })

    const where = {
      id_topico_comunidade: Number(id_topico_comunidade),
      id_usuario: userId
    }

    try {
      await this._respostaModel.updateResposta({ conteudo }, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }

  private factoryContent(id_usuario: number, conteudo: string, id_topico_comunidade: number) {
    const data_publicacao = nowDateUTC()
    
    return { id_usuario, conteudo, id_topico_comunidade, data_publicacao }
  }
}

export default new TopicoController()
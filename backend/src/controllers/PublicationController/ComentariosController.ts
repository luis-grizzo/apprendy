import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import NotificationModel from '../../models/UsersModel/NotificationModel'
import ConteudoModel from '../../models/PublicationModel/ConteudoModel'
import ComentariosModel from '../../models/PublicationModel/ComentariosModel'

import FormatDate from '../../utils/FormatDate'
import nowDateUTC from '../../utils/nowDateUTC'

class ComentariosController {
  private _comentariosModel = new ComentariosModel()
  private _userModel = new UserModel()
  private _notificationModel = new NotificationModel()
  private _conteudoModel = new ConteudoModel()

  public index = async (req: Request, res: Response) => {
    const { id_conteudo } = req.params
    const { pages, order } = req.query

    let comentarios;
    console.log(id_conteudo);
    if(Number(id_conteudo) > 0){
       comentarios = await this._comentariosModel.indexComentarios(Number(pages), String(order), Number(id_conteudo))
    }else{
       comentarios = await this._comentariosModel.indexTodosComentarios()
      
    }  

    comentarios = comentarios.map(comentario => {
      comentario.data_publicacao = FormatDate(comentario.data_publicacao)
      
      return comentario
    })

    return res.json(comentarios)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params
    let { conteudo } = req.body
    
    if(!conteudo) return res.status(401).json({ error: 'Please, inform message content' })

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: "Content not found"})

    const data = this.factoryMessage(Number(id_conteudo), userId, conteudo)

    try {
      const id = await this._comentariosModel.createComentario(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._conteudoModel.getUserPublication(Number(id_conteudo))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, comentou em sua publicação!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }
      
      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    const { id_comentario } = req.params
    const { conteudo } = req.body

    const where = {
      id_usuario: userId,
      id_comentario: Number(id_comentario)
    }

    const existsComentario = await this._comentariosModel.existsComentario(where)

    if(!existsComentario) return res.status(401).json({ error: 'Commentary don\'t exists' })

    try {
      await this._comentariosModel.updateComentario({ conteudo }, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }

  public delete = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    const { id_comentario } = req.params

    const where = {
      id_usuario: userId,
      id_comentario: Number(id_comentario)
    }

    const existsComentario = await this._comentariosModel.existsComentario(where)

    if(!existsComentario) return res.status(401).json({ error: 'Commentary don\'t exists' })

    try {
      await this._comentariosModel.deleteComentario(where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }


  private factoryMessage(id_conteudo: number, id_usuario: number, conteudo: string) {
    const data_publicacao = nowDateUTC()
    
    return { id_conteudo, id_usuario, conteudo, data_publicacao }
  }
}

export default new ComentariosController()
import { Request, Response } from 'express'

import NotificationModel from '../../models/UsersModel/NotificationModel'
import UserModel from '../../models/UsersModel/UserModel'

import LikesModel from '../../models/PublicationModel/LikesModel'
import ConteudoModel from '../../models/PublicationModel/ConteudoModel'

class LikesController {
  private _userModel = new UserModel()
  private _notificationModel = new NotificationModel()
  private _likeModel = new LikesModel()
  private _conteudoModel = new ConteudoModel()

  public show = async(req: Request, res: Response) =>{
    const { userId } = req.userSession
    const { id_conteudo } = req.params

    const userHasLikedPost = await this._likeModel.existsLike(Number(id_conteudo), userId)
    
    const data = {
      HasLiked: !!userHasLikedPost
    }

    res.json(data)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params

    const alreadyLiked = await this._likeModel.existsLike(Number(id_conteudo), userId)

    if (alreadyLiked) return res.status(401).json({ error: "Already liked" })

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: 'Content not found'})

    const data = {
      id_conteudo: Number(id_conteudo),
      id_usuario: userId
    }

    try {
      const id = await this._likeModel.createLike(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._conteudoModel.getUserPublication(Number(id_conteudo))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, curtiu a sua publicação!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public delete = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params

    const alreadyLiked = await this._likeModel.existsLike(Number(id_conteudo), userId)

    if (!alreadyLiked) return res.status(401).json({ error: "Don't have Authorization" })

    const where = {
      id_conteudo: Number(id_conteudo),
      id_usuario: userId
    }

    try {
      await this._likeModel.deleteLike(where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new LikesController()
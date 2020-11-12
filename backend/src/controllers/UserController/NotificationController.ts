import { Request, Response } from 'express'

import NotificationModel from '../../models/UsersModel/NotificationModel'

class UsersController  {
  private _notificationModel = new NotificationModel()

  public index = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    const notificacoes = await this._notificationModel.indexNotificacao(userId)

    return res.json(notificacoes)
  }

  public delete = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    try {
      await this._notificationModel.deleteNotificacao(userId)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new UsersController ()
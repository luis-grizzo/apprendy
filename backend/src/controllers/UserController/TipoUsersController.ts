import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'

class TipoUsersController  {
  private _userModel = new UserModel()

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { email } = req.query
    const { id_tipo } = req.body

    if(!email || !id_tipo) return res.status(401).json({ error: 'Please, inform all data' })

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    try {
      await this._userModel.Update({ id_tipo: Number(id_tipo) }, { email })

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new TipoUsersController ()
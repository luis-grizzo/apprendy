import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'

class UsersDashboard {
  private _userModel = new UserModel()

  public show = async (req: Request, res: Response) => {
    const { id } = req.params

    if(isNaN(Number(id))) {
      return res.status(400).json({ error: 'bad request'})
    }

    const userInfo = await this._userModel.DashBoard(Number(id))
    
    if(!userInfo) return res.status(404).json({ error: "User not Found" })

    return res.json(userInfo)
  }
}

export default new UsersDashboard()
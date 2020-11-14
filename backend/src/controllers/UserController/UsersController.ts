import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'

class UsersController  {
  private _userModel = new UserModel()

  public index = async (req: Request, res: Response) => {
    const users = await this._userModel.indexUsuario()

    return res.json(users)
  }

  public show = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    const user = await this._userModel.GetAccount(userId)

    if(!user) return res.status(404).json({ error: "User not Found" })

    return res.json(user)
  }

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { nome, email, foto_perfil, texto_perfil, capa_perfil } = req.body

    const getAccount = await this._userModel.GetAccount(Number(userId))
    
    if(!getAccount) return res.status(404).json({ error: 'User not Found' })

    if(!email) return res.status(400).json({ error: "E-mail is required"}) 

    const existsMail = await this._userModel.ReadWithWhereFirst({ email })

    if(existsMail && existsMail.email != email) 
      return res.status(401).json({ error: 'E-mail alredy exists' })
      
    let data: object = {
      nome: String(nome).trim(),
      email: String(email).trim(),
      foto_perfil: String(foto_perfil).trim(),  
      texto_perfil: String(texto_perfil).trim(),
      capa_perfil: String(capa_perfil),
     
    }
    
    try {
      await this._userModel.updateUsuario(data, Number(userId))
      
      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new UsersController ()
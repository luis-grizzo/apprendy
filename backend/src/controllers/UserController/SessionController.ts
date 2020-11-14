import { Request, Response } from 'express'
import bycript from 'bcryptjs'

import GenerateToken from '../../utils/GenerateToken'

import UserModel from '../../models/UsersModel/UserModel'
import SessionsModel from '../../models/UsersModel/SessionsModel'

import FormatDate from '../../utils/FormatDate'
import nowDateUTC from '../../utils/nowDateUTC'

class SessionsController {
  private _sessionModel = new SessionsModel()
  private _userModel = new UserModel()

  public signup = async (req: Request, res: Response) => {
    let { email, nome, senha } = req.body

    const existAccount = await this._sessionModel.existAccount(String(email))

    if (existAccount) return res.status(409).json({ error: 'E-mail exists, try again' })

    try {
      const data = await this.FactoryCreateAccountData(String(email), String(nome), String(senha))

      const id = await this._sessionModel.createAccount(data)

      const token = GenerateToken(id)

      return res.json({ token })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public signin = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    const user = await this._sessionModel.getPassword(String(email))

    if (!user) return res.status(404).json({ error: 'User Not Found' })

    const verifyPassword = await bycript.compare(String(senha), user.senha)

    if (!verifyPassword) return res.status(401).json({ error: 'Invalid Password' })

    const token = GenerateToken(user.id_usuario)

    return res.json({ token })
  }

  public forgotPassword = async (req: Request, res: Response) => {
    const { email, pergunta_seguranca, resposta } = req.body
    
    if(!email || !pergunta_seguranca || !resposta) {
      return res.status(400).json({ error: "Bad Request" })
    }

    const getAccount = await this._userModel.ReadWithWhereFirst({ email, pergunta_seguranca, resposta })

    if(!getAccount) return res.status(401).json({ error: "Invalid Answer" })

    const token = GenerateToken(getAccount.id_usuario)

    return res.json({ token })
  }

  public changePassword = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { senha } = req.body

    try {
      const password = await bycript.hash(senha, 10) 

      await this._userModel.Update({ senha: password }, { id_usuario: userId })

      return res.send()
    } catch(e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public changeSecurity = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { pergunta_seguranca, resposta, senha } = req.body

    const password = await bycript.hash(senha, 10) 

    const data = {
      senha: password,
      pergunta_seguranca: String(pergunta_seguranca).trim(),  
      resposta: String(resposta).trim(),  
    }

    try {
      await this._userModel.updateUsuario(data, Number(userId))
      
      return res.send('')
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  private FactoryCreateAccountData = async (email: string, nome: string, password: string) => {
    const isFirstUserCreate = await this._userModel.ReadWithLimit(2)

    const date = nowDateUTC()
    const data_entrada = FormatDate(date)

    const id_tipo = isFirstUserCreate.length > 0 ? 1 : 3
    
    const senha = await bycript.hash(password, 10)

    return { email, nome, senha, id_tipo, data_entrada }
  }
}

export default new SessionsController()
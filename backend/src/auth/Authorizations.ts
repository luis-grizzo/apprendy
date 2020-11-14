import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { hash } from './configs/tokenConfig.json'

export interface Decoded {
  id: number
  iat: number
  exp: number
}

import UserModel from '../models/UsersModel/UserModel'

class Authorization {
  private _model = new UserModel()

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth) return res.status(401).json({ error: 'No Token Provided' })

    const [schema, token] = auth.split(' ')

    if (!/^Bearer$/i.test(schema) || !token) return res.status(401).json({ error: 'Token Malformed' })

    jwt.verify(token, hash, async (err, decoded: Decoded) => {
      if (err) return res.status(401).json({ error: 'Token Invalid' })

      const userId = decoded.id
      const user = await this._model.GetAccount(userId)
      
      if (!user) return res.status(404).json({ error: 'User not Found' })
      
      req.userSession = { userId }

      return next()
    })
  }

  public authenticated = (req: Request, res: Response) => {
    // Essa função vai servir para authenticar no front-end
    res.send('')
  }
}

export default new Authorization()
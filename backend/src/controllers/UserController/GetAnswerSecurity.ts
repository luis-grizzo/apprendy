import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'

class GetAnswerSecurity  {
  private _userModel = new UserModel()

  public show = async (req: Request, res: Response) => {
    const { email } = req.query

    if(!email) return res.status(400).json({ error: 'Bad Request, inform e-mail'})

    const answer = await this._userModel.ReadReturnSelectWithWhereFirst(['pergunta_seguranca'], { email })
    
    return res.json(answer)
  }
}

export default new GetAnswerSecurity()
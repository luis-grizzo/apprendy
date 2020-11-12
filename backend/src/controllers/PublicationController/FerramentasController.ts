import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import FerramentasModel from '../../models/PublicationModel/FerramentasModel'

class FerramentasController {
  private _userModel = new UserModel()
  private _ferramentasModel = new FerramentasModel()

  public index = async (req: Request, res: Response) => {
    const tags = await this._ferramentasModel.indexFerramentas()

    return res.json(tags)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { descritivo, icone, id_categoria } = req.body

    if(!descritivo || !icone || !id_categoria) 
      return res.status(401).json({ error: 'Please, inform all data' })

    const existsTool = await this._ferramentasModel.existsFerramentas(descritivo)

    if(existsTool) return res.status(401).json({ error: 'Tool alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    const data = {
      descritivo: String(descritivo).trim(),
      icone: String(icone),
      id_categoria: Number(id_categoria)
    }

    try {
      const id = await this._ferramentasModel.createFerramentas(data)

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    const { id_ferramenta } = req.params
    const { descritivo, icone, id_categoria } = req.body

    const getTool = await this._ferramentasModel.ReadWithWhereFirst({ id_ferramenta })

    if(!getTool) return res.status(401).json({ error: 'Tool don\'t exists' })

    const existsTool = await this._ferramentasModel.existsFerramentas(descritivo)
    
    if(existsTool && existsTool.id_ferramenta != Number(id_ferramenta)) 
      return res.status(401).json({ error: 'Tool alredy exists' })

    const data = {
      descritivo: String(descritivo).trim(),
      icone: String(icone),
      id_categoria: Number(id_categoria)
    }

    try {
      await this._ferramentasModel.updateFerramentas(data, Number(id_ferramenta))

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new FerramentasController()
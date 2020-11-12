import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import CategoriaModel from '../../models/PublicationModel/CategoriaModel'

class CategoriaController {
  private _userModel = new UserModel()
  private _categoriaModel = new CategoriaModel()

  public index = async (req: Request, res: Response) => {
    const { limit } = req.query

    if(!limit) return res.status(400).json({ error: 'limit not informed' })
    if(Number(limit) <= 0) return res.status(401).json({ error: 'limit is not valid' })
    
    const category = await this._categoriaModel.indexCategoria(Number(limit))
    return res.json(category)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { descritivo } = req.body

    const existsCategory = await this._categoriaModel.existsCategoria(descritivo)

    if(existsCategory) return res.status(401).json({ error: 'category alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    if(!descritivo) return res.status(400).json({ error: "'descritivo' no content"})

    try {
      const id = await this._categoriaModel.createCategoria(descritivo)

      return res.json({ id, descritivo })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    const { id_categoria } = req.params
    const { descritivo } = req.body

    const getCategory = await this._categoriaModel.ReadWithWhereFirst({ id_categoria })

    if(!getCategory) return res.status(401).json({ error: 'category don\'t exists'})

    const existsCategory = await this._categoriaModel.existsCategoria(descritivo)
    
    if(existsCategory && existsCategory.id_categoria != Number(id_categoria)) 
      return res.status(401).json({ error: 'category alredy exists'})

    try {
      await this._categoriaModel.updateCategoria(Number(id_categoria), descritivo)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new CategoriaController()
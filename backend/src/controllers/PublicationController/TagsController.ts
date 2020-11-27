import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import TagsModel from '../../models/PublicationModel/TagsModel'

class TagsController {
  private _userModel = new UserModel()
  private _tagsModel = new TagsModel()

  public index = async (req: Request, res: Response) => {
    const { limit } = req.query
    const { id_tag } = req.query

    if(!limit) return res.status(400).json({ error: 'limit not informed' })
    if(Number(limit) <= 0) return res.status(401).json({ error: 'limit is not valid' })

    let tag = []

    if(Number(id_tag) > 0) tag = await this._tagsModel.indexTagId(Number(id_tag))
    else tag = await this._tagsModel.indexTags(Number(limit))

    return res.json(tag)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { descritivo } = req.body

    const existsTag = await this._tagsModel.existsTags(descritivo)

    if(existsTag) return res.status(401).json({ error: 'Tag alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    if(!descritivo) return res.status(400).json({ error: "'descritivo' no content" })

    try {
      const id = await this._tagsModel.createTags(descritivo)

      return res.json({ id, descritivo })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    const { id_tag } = req.params
    const { descritivo } = req.body

    const getTag = await this._tagsModel.ReadWithWhereFirst({ id_tag })

    if(!getTag) return res.status(401).json({ error: 'Tag don\'t exists' })

    const existsTag = await this._tagsModel.existsTags(descritivo)
    
    if(existsTag && existsTag.id_tag != Number(id_tag)) 
      return res.status(401).json({ error: 'Tag alredy exists' })

    try {
      await this._tagsModel.updateTags(Number(id_tag), descritivo)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }
}

export default new TagsController()
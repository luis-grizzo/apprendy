import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class TagsModel extends SimpleCRUD {
  constructor () { super('tags') }

  public getTag = async (id_tag: number) => {
    const tag = await this.ReadWithWhereFirst({ id_tag })

    return tag  
  }

  public existsTags = async (descritivo: string) => {
    const tags = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return tags
  }

  public createTags = async (descritivo: string) => {
    const id = await this.Create({ descritivo: descritivo.trim() })

    return id[0]
  }

  public indexTags = async (limit: number) => {
    const tags = await this.ReadWithLimit(limit)

    return tags
  }

  public indexTagId = async (id_tag: number) => {
    const tags = await this.ReadWithWhereFirst({id_tag})

    return tags
  }

  public updateTags = async (id_tag: number, descritivo: string) => {
    await this.Update({ descritivo: descritivo.trim() }, { id_tag })
  }
}

export default TagsModel
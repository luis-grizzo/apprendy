import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'


class TagsConteudosModel extends SimpleCRUD {
  constructor () { super('tags_conteudos') }

  public createTagsConteudos = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public updateTagsConteudos = async (data: object, id_tag_conteudo: number) => {
    await this.Update(data, { id_tag_conteudo })
  }

  public deleteTagsConteudos = async (id_conteudo: number) => {
    await this.Delete({ id_conteudo })
  }
}

export default TagsConteudosModel
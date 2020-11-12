import knex from '../../database/connection'

import UserModel from '../UsersModel/UserModel'
import SimpleCRUD from '../SimpleCRUD'

class ConteudoModel extends SimpleCRUD {
  private _userModel = new UserModel()
  constructor () { super('conteudos') }

  public getUserPublication = async (id_conteudo: number) => {
    const publication = await this.ReadWithWhereFirst({ id_conteudo })

    const user = await this._userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user
  }

  public createConteudo = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public existsConteudo = async (id_conteudo: number) => {
    const conteudo = await this.ReadWithWhereFirst({ id_conteudo })

    return conteudo
  }

  public indexConteudo = async (pages: number, order: string) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }

    const conteudos = await knex('conteudos')
      .innerJoin('usuarios', 'usuarios.id_usuario', 'conteudos.id_usuario')
      .innerJoin('ferramentas', 'ferramentas.id_ferramenta', 'conteudos.id_ferramenta')
      .leftJoin('likes_conteudo', 'likes_conteudo.id_conteudo', 'conteudos.id_conteudo')
      .select([
        "conteudos.*",
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo"
      ])
      .count('likes_conteudo.id_conteudo as likes')
      .groupBy('conteudos.id_conteudo')
      .orderBy('likes', order)
      .limit(10)
      .offset((pages - 1) * 10)

    const conteudo = await this.tagsConteudos(conteudos)

    return conteudo
  }

  private tagsConteudos = async (conteudos: Array<object>) => {
    const tags = await Promise.all(conteudos.map(async conteudo => this.getTags(conteudo)))
    
    return tags
  }

  private getTags = async (conteudo: any) => {
    const tag = await knex('tags_conteudos')
      .innerJoin('tags', 'tags.id_tag', 'tags_conteudos.id_tag')
      .where('id_conteudo', conteudo.id_conteudo)
      .select([
        "tags_conteudos.id_tag_conteudo",
        "tags.*"
      ]) 

    return { publicacao: conteudo, tag }
  }

  public updateConteudos = async (data: object, id_conteudo: number) => {
    await this.Update(data, { id_conteudo })
  }

  public deleteConteudos = async (id_conteudo: number) => {
    await this.Delete({ id_conteudo })
  }
}

export default ConteudoModel
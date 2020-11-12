import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class CommentariosModel extends SimpleCRUD {
  constructor () { super('comentarios') }

  public existsComentario = async (where: object) => {
    const comentario = await this.ReadWithWhereFirst(where)

    return comentario
  }

  public indexComentarios = async (pages: number, order: string, id_conteudo: number) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }

    const comentarios = await knex('comentarios')
      .innerJoin('usuarios', 'usuarios.id_usuario', 'comentarios.id_usuario')
      .innerJoin('conteudos', 'conteudos.id_conteudo', 'comentarios.id_conteudo')
      .where('comentarios.id_conteudo', id_conteudo)
      .select([
        'comentarios.*',
        'usuarios.nome as usuario_nome',
        'usuarios.foto_perfil as usuario_foto',
      ])
      .groupBy('comentarios.id_comentario')
      .orderBy('comentarios.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)

    return comentarios
  }

  public createComentario = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public updateComentario =  async (data: object, where: object) => {
    await this.Update(data, where)
  }

  public deleteComentario =  async (where: object) => {
    await this.Delete(where)
  }
}

export default CommentariosModel
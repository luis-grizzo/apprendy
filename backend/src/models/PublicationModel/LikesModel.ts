import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class LikesModel extends SimpleCRUD {
  constructor () { super('likes_conteudo') }

  public existsLike = async (id_conteudo: number, id_usuario: number) => {
    const like = await this.ReadWithWhereFirst({ id_conteudo, id_usuario })

    return like 
  }

  public createLike = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public deleteLike =  async (where: object) => {
    await this.Delete(where)
  }
}

export default LikesModel
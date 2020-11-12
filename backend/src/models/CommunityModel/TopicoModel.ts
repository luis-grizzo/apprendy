import knex from '../../database/connection'

import UserModel from '../UsersModel/UserModel'
import SimpleCRUD from '../SimpleCRUD'

class TopicoModel extends SimpleCRUD {
  private _userModel = new UserModel()
  
  constructor () { super('topicos_comunidade') }

  public getUserPublication = async (id_topico_comunidade: number) => {
    const publication = await this.ReadWithWhereFirst({ id_topico_comunidade })

    const user = await this._userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user
  }

  public existsTopico = async (id_topico_comunidade: number) => {
    const topico = await this.ReadWithWhereFirst({ id_topico_comunidade })

    return topico
  }

  public createTopico = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public indexTopico = async (pages: number, order: string) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }

    const topicos = await knex("topicos_comunidade")
      .innerJoin('usuarios', 'usuarios.id_usuario', 'topicos_comunidade.id_usuario')
      .leftJoin('respostas_topico', 'respostas_topico.id_topico_comunidade', 'topicos_comunidade.id_topico_comunidade')
      .select([
        "topicos_comunidade.*",
        "usuarios.nome as usuarios_nome"
      ])
      .count('respostas_topico.id_topico_comunidade as respostas')
      .groupBy('topicos_comunidade.id_topico_comunidade')
      .orderBy('topicos_comunidade.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)

    return topicos
  }

  public updateTopico = async (data: object, where: object) => {
    await this.Update(data, where)
  }
}

export default TopicoModel
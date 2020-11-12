import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class UserModel extends SimpleCRUD {
  constructor () { super('usuarios') }

  public GetAccount = async (id_usuario: number) => {
    const user = await this.ReadWithWhereFirst({ id_usuario })

    if(!user) return false

    user.senha = undefined

    return user
  };

  public indexUsuario = async () => {
    let users = await this.Read()

    users = users.map(user => {
      user.senha = undefined

      return user
    })

    return users
  }

  public updateUsuario = async (data: object, id_usuario: number) => {
    await this.Update(data, { id_usuario })
  }
}

export default UserModel
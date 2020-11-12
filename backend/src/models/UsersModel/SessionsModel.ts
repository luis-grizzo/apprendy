import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class SessionsModel extends SimpleCRUD {
  constructor () { super('usuarios') }

  public getPassword = async (email: string) => {
    const user = await this.ReadReturnSelectWithWhereFirst(['id_usuario', 'senha'], { email })

    return user
  }

  public existAccount = async (email: string) => {
    const user = await this.ReadWithWhereFirst({ email })

    return user
  }

  public createAccount = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }
}

export default SessionsModel
import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class FerramentasModel extends SimpleCRUD {
  constructor () { super('ferramentas') }

  public existsFerramentas = async (descritivo: string) => {
    const ferramentas = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return ferramentas
  }

  public createFerramentas = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public indexFerramentas = async () => {
    const ferramentas = await this.Read()

    return ferramentas
  }

  public updateFerramentas = async (data: object, id_ferramenta: number) => {
    await this.Update(data, { id_ferramenta })
  }
}

export default FerramentasModel
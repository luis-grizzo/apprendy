import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class CategoriaModel extends SimpleCRUD {
  constructor () { super('categorias') }

  public existsCategoria = async (descritivo: string) => {
    const categoria = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return categoria
  }

  public createCategoria = async (descritivo: string) => {
    const id = await this.Create({ descritivo: descritivo.trim() })

    return id[0]
  }

  public indexCategoria = async (limit: number) => {
    const categorias = await this.ReadWithLimit(limit)

    return categorias
  }

  public updateCategoria = async (id_categoria: number, descritivo: string) => {
    await this.Update({ descritivo: descritivo.trim() }, { id_categoria })
  }
}

export default CategoriaModel
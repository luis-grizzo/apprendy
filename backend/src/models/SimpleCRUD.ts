import knex from '../database/connection'

class SimpleCRUD {
  constructor (public table: string) {}

  public Create = async (data: any) => {
    const createData = await knex(this.table).insert(data)

    return createData
  }

  public Read = async () => {
    return await knex(this.table).select('*')
  }
  
  public ReadWithLimit = async (limit: number) => {
    return await knex(this.table).select('*').limit(limit)
  }

  public ReadFirst = async () => {
    return await knex(this.table).select('*').first()
  }

  public ReadWithWhere = async (where: object) => {
    return await knex(this.table).where(where).select('*')
  }

  public ReadWithWhereCount = async (where: object) => {
    const count = await knex(this.table).where(where).count().first()

    return count['count(*)']
  }

  public ReadWithWhereFirst = async (where: object) => {
    return await knex(this.table).where(where).select('*').first()
  }

  public ReadReturnSelect = async (select: Array<string>) => {
    return await knex(this.table).select(select)
  }

  public ReadReturnSelectWithWhere = async (select: Array<string>, where: object) => {
    return await knex(this.table).select(select).where(where)
  }

  public ReadReturnSelectWithWhereFirst = async (select: Array<string>, where: object) => {
    return await knex(this.table).select(select).where(where).first()
  }

  public Update = async (data: object, where: object) => {
    await knex(this.table).update(data).where(where)
  }

  public Delete = async (where: object) => {
    await knex(this.table).where(where).first().delete()
  }
}

export default SimpleCRUD
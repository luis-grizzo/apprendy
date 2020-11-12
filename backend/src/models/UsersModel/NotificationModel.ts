import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class NotificationModel extends SimpleCRUD {
  constructor () { super('notificacoes') }

  public createNotificacao = async (conteudo: string, id_usuario: number) => {
    await this.Create({ conteudo, id_usuario })
  };

  public indexNotificacao = async (id_usuario: number) => {
    const notificacoes = await this.ReadWithWhere({ id_usuario })
    
    return notificacoes
  }

  public deleteNotificacao = async (id_usuario: number) => {
    await this.Delete({ id_usuario })
  }
}

export default NotificationModel
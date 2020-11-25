import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'
import ConteudoModel from '../PublicationModel/ConteudoModel'
import FormatDate from '../../utils/FormatDate'

class UserModel extends SimpleCRUD {
  constructor () { super('usuarios') }

  private _contents = new ConteudoModel()

  public GetAccount = async (id_usuario: number) => {
    const user = await this.ReadWithWhereFirst({ id_usuario })

    if(!user) return;

    return this.OccultSecreatUserData(user)
  };

  public DashBoard = async (id_usuario: number) => {
    const user = await this.GetAccount(id_usuario)

    if(!user) return;
    
    let likes = await this._contents.getUserPublicationsLiked(id_usuario)
    let contents = await this._contents.getUserPublications(id_usuario)

    likes = likes.map(conteudo => {
      conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)
      
      return conteudo
    })

    contents = contents.map(conteudo => {
      conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)
      
      return conteudo
    })

    return { user, likes, contents }
  }

  public indexUsuario = async () => {
    const getUsers = await this.Read()

    const users = getUsers.map(user => this.OccultSecreatUserData(user))

    return users
  }

  public updateUsuario = async (data: object, id_usuario: number) => {
    await this.Update(data, { id_usuario })
  }

  private OccultSecreatUserData = (user: any) => {
    user.senha = undefined
    user.resposta = undefined
    user.pergunta_seguranca = undefined

    return user
  }
}

export default UserModel
import FormatDate from "../../utils/FormatDate";
import knex from "../../database/connection";

import SimpleCRUD from "../SimpleCRUD";
import { QueryBuilder } from "knex";
import { Search } from "../Search";

class ConteudoModel extends SimpleCRUD {
  constructor() {
    super("conteudos");
  }

  public search: Search;

  public showPublication = async (id_conteudo: number) => {
    const getConteudo = await knex("conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where({ 'conteudos.ativo': true, 'conteudos.id_conteudo': id_conteudo })
      .count("likes_conteudo.id_conteudo as likes")
      .select('conteudos.*')
      .select("usuarios.nome as usuario_nome")
      .first()

    if(!getConteudo.id_conteudo) return;

    const conteudo = await this.getTags(getConteudo)

    conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)

    return conteudo
  }

  public getUserPublications = async (id_usuario: number) => {
    const contents = await this.ReadReturnSelectWithWhere(
      this.selectContent(),
      { id_usuario, ativo: true }
    );

    const conteudo = await this.tagsConteudos(contents);

    return conteudo;
  };

  public getUserPublicationsLiked = async (id_usuario: number) => {
    const contents = await knex("conteudos")
      .innerJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where({
        "likes_conteudo.id_usuario": id_usuario,
        "conteudos.ativo": true,
      })
      .select(this.selectContent());

    const conteudo = await this.tagsConteudos(contents);
    
    return conteudo;
  };

  public getUserPublication = async (id_conteudo: number) => {
    const publication = await this.ReadWithWhereFirst({
      id_conteudo,
      ativo: true,
    });

    const userModel = new SimpleCRUD("usuarios");

    const user = await userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user;
  };

  public createConteudo = async (data: object) => {
    const id = await this.Create(data);

    return id[0];
  };

  public existsConteudo = async (id_conteudo: number) => {
    const conteudo = await this.ReadWithWhereFirst({ id_conteudo });

    return conteudo;
  };

  public indexConteudo = async (pages: number, order: string, search: Search ,onlyActive?: boolean) => {
    this.search = search

    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await knex("conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta"
      )
      .innerJoin('categorias', 'categorias.id_categoria', 'ferramentas.id_categoria')
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where(this.onlyActive(onlyActive))
      .modify(this.searchLike)
      .select(this.selectContent())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "categorias.descritivo as categoria",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("likes", order)
      .limit(10)
      .offset((pages - 1) * 10);

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  };

  private searchLike = (table: QueryBuilder) => {
    if(!this.search.typeIsValid() || this.search.type === 'tags') return;

    return table.where(this.getColumnByType(), "like", `%${this.search.value}%`)
  }

  private getColumnByType = (): string => {
    const types = {
      "recursos": 'conteudos.titulo', 
      "ferramentas": 'ferramentas.descritivo', 
      "categorias": "categorias.descritivo"
    }

    return types[this.search.type]
  }

  private onlyActive = (active: boolean) => {
    return active ? { ativo : true } : { }
  }

  private tagsConteudos = async (conteudos: Array<object>) => {
    const tags = await Promise.all(
      conteudos.map(async (conteudo) => await this.getTags(conteudo))
    );

    return tags;
  };

  private getTags = async (conteudo: any) => {
    const tag = await knex("tags_conteudos")
      .innerJoin("tags", "tags.id_tag", "tags_conteudos.id_tag")
      .where("id_conteudo", conteudo.id_conteudo)
      .select(["tags_conteudos.id_tag_conteudo", "tags.*"]);

    return { publicacao: conteudo, tag };
  };

  public updateConteudos = async (data: object, id_conteudo: number) => {
    await this.Update(data, { id_conteudo });
  };

  public deleteConteudos = async (id_conteudo: number) => {
    await this.Delete({ id_conteudo });
  };

  private selectContent = () => {
    return [
      "conteudos.id_conteudo",
      "conteudos.titulo",
      "conteudos.imagem",
      "conteudos.descricao",
      "conteudos.data_publicacao",
      "conteudos.id_usuario",
      "conteudos.id_ferramenta",
    ];
  };
}

export default ConteudoModel;

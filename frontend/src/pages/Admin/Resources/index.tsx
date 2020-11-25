/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MdAdd, MdRemoveRedEye, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface Content {
  id_conteudo: number;
  titulo: string;
  descricao: string;
  data_publicacao: string;
  usuario_nome: string;
  likes: number;
}

interface ContentResponse {
  publicacao: Content;
  tags: Tag[];
}

interface Tag {
  id_tag: number;
  descritivo: string;
}

const resources: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    api.get<ContentResponse[]>('/conteudos').then(response => {
      const posts = response.data.map(content => content.publicacao);
      setContents(posts);
    });
  }, []);

  return (
    <>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Recursos</h1>
              <Link to="/content/resource">
                <Button
                  type="button"
                  size="large"
                  variant="contrast"
                  icon={MdAdd}
                >
                  Criar Recurso
                </Button>
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Data de publicação</th>
                    <th>Autor</th>
                    <th>Favoritos</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map(content => (
                    <tr>
                      <td>{content.id_conteudo}</td>
                      <td>{content.titulo.substring(0, 20)}</td>
                      <td>{content.descricao.substring(0, 30)}</td>
                      <td>{content.data_publicacao}</td>
                      <td>{content.usuario_nome}</td>
                      <td>{content.likes}</td>
                      <td className={styles.actionsTd}>
                        <Link
                          to={`/post/${content.id_conteudo}`}
                          className={styles.action}
                        >
                          <Button icon={MdRemoveRedEye}>Visualizar</Button>
                        </Link>
                        <Link
                          to={`/post/${content.id_conteudo}/edit`}
                          className={styles.action}
                        >
                          <Button icon={MdEdit}>Editar</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default resources;

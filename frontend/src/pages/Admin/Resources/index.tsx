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
  imagem: string;
  titulo: string;
  descricao: string;
  data_publicacao: string;
  usuario_nome: string;
  likes: number;
  ativo: number;
}

interface ContentResponse {
  publicacao: Content;
  tag: Tag[];
}

interface Tag {
  id_tag: number;
  descritivo: string;
}

const resources: React.FC = () => {
  const [contents, setContents] = useState<ContentResponse[]>([]);

  useEffect(() => {
    api.get<ContentResponse[]>('/conteudos').then(response => {
      setContents(response.data);
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
              <h1 className={styles.title}>Recursos</h1>
              <Link to="/content/resource">
                <Button type="button" variant="contrast" icon={MdAdd}>
                  Criar Recurso
                </Button>
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Titulo</th>
                    <th>Tags</th>
                    <th>Data de publicação</th>
                    <th>Autor</th>
                    <th>Ativo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map(content => (
                    <tr>
                      <td>
                        {`${content.publicacao.titulo.substring(0, 20)}...`}
                      </td>
                      <td>
                        {content.tag.map(tag => (
                          <span className={styles.tag}>{tag.descritivo}</span>
                        ))}
                      </td>
                      <td>{content.publicacao.data_publicacao}</td>
                      <td>{content.publicacao.usuario_nome}</td>
                      <td>
                        {content.publicacao.ativo === 1 ? 'Ativo' : 'Inativo'}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link
                            to={`/post/${content.publicacao.id_conteudo}`}
                            className={styles.action}
                          >
                            <Button icon={MdRemoveRedEye}>Visualizar</Button>
                          </Link>
                          <Link
                            to={`/edit/resource/${content.publicacao.id_conteudo}`}
                            className={styles.action}
                          >
                            <Button icon={MdEdit}>Editar</Button>
                          </Link>
                        </div>
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

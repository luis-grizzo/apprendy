/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface Comments {
  id_comentario: string;
  id_conteudo: number;
  usuario_nome: string;
  data_publicacao: string;
}

const comments: React.FC = () => {
  const [commentsContent, setCommentsContent] = useState<Comments[]>([]);

  // useEffect(() => {
  //   api.get<Comments[]>('/ferramentas?limit=1000000').then(response => {
  //     setToolsContent(response.data);
  //   });
  // }, []);

  return (
    <>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Comentários</h1>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Id recurso</th>
                    <th>Conteudo</th>
                    <th>Autor</th>
                    <th>Data da publicação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsContent.map(comment => (
                    <tr>
                      <td>{comment.id_comentario}</td>
                      <td>{comment.id_conteudo}</td>
                      <td>{comment.usuario_nome}</td>
                      <td>{comment.data_publicacao}</td>
                      <td>
                        <div className={styles.actions}>
                          <Button icon={MdClose} variant="error">
                            Excluir
                          </Button>
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

export default comments;

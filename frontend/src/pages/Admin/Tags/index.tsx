/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface Tag {
  id_tag: number;
  descritivo: string;
}

const tags: React.FC = () => {
  const [tagsContent, setTagsContent] = useState<Tag[]>([]);

  useEffect(() => {
    api.get<Tag[]>('/tags?limit=1000000').then(response => {
      setTagsContent(response.data);
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
              <h1 className={styles.title}>Tags</h1>
              <Link to="/content/tag">
                <Button type="button" variant="contrast" icon={MdAdd}>
                  Criar Tag
                </Button>
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tagsContent.map(tag => (
                    <tr>
                      <td>{tag.id_tag}</td>
                      <td>{tag.descritivo}</td>
                      <td>
                        <div className={styles.actions} />
                        <Link
                          to={`/edit/tag/${tag.id_tag}`}
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

export default tags;

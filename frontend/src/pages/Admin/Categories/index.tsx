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

interface Category {
  id_categoria: number;
  descritivo: string;
}

const category: React.FC = () => {
  const [cateogries, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>('/categorias?limit=1000000').then(response => {
      setCategories(response.data);
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
              <h1>Categorias</h1>
              <Link to="/content/category">
                <Button
                  type="button"
                  size="large"
                  variant="contrast"
                  icon={MdAdd}
                >
                  Criar Categoria
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
                  {cateogries.map(categoryContent => (
                    <tr>
                      <td>{categoryContent.id_categoria}</td>
                      <td>{categoryContent.descritivo}</td>
                      <td className={styles.actionsTd}>
                        <Link
                          to={`/post/${categoryContent.id_categoria}/edit`}
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

export default category;

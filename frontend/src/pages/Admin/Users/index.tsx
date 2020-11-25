/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/md';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  data_entrada: string;
  id_tipo: number;
}

const users: React.FC = () => {
  const [usersContent, setUsersContent] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>('/users').then(response => {
      setUsersContent(response.data);
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
              <h1>Usuários</h1>
              <Button
                type="button"
                icon={MdAdd}
                size="large"
                variant="contrast"
              >
                Criar usuário
              </Button>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de entrada</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usersContent.map(user => (
                    <tr>
                      <td>{user.id_usuario}</td>
                      <td>{user.nome}</td>
                      <td>{user.email}</td>
                      <td>{user.data_entrada}</td>
                      <td>{user.id_tipo}</td>
                      <td className={styles.actionsTd}>
                        <Link
                          to={`/post/${user.id_usuario}/edit`}
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

export default users;

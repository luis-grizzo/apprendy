/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdSave } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Select from '../../../components/Select';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface User {
  id_usuario?: number;
  nome?: string;
  email?: string;
  data_entrada?: string;
  id_tipo?: number;
}

interface Login {
  id_usuario: number;
  id_tipo: number;
  email: string;
}

const users: React.FC = () => {
  const [usersContent, setUsersContent] = useState<User[]>([]);
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState<Login>();
  const [editUser, setEditUser] = useState<User>();

  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api.get<User[]>('/users').then(response => {
      setUsersContent(response.data);
    });

    api.get('/users/home/info').then(response => {
      setLogin(response.data);
    });
  }, []);

  const handleUserUpdate = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      console.log('Formulário', data);

      await api.put(`/admin/users/tipo_user?email=${editUser?.email}`, data);
      toast.success('✅ Perfil atualizado com sucesso!');

      formRef.current.reset();
      setModal(!modal);
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao autalizar o perfil!');
    }
  };

  const handleModal = (id: number) => {
    api.get(`/users/${id}/info`).then(response => {
      setEditUser(response.data.user);
      console.log('Usuário selecionado', response.data.user);
    });

    setModal(!modal);
  };

  return (
    <>
      <Modal
        open={modal}
        title="Alterar privilégios"
        headerContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button
            icon={MdSave}
            variant="contrast"
            onClick={() => formRef.current.submitForm()}
          >
            Salvar
          </Button>
        }
      >
        <Form
          ref={formRef}
          onSubmit={handleUserUpdate}
          initialData={{ id_tipo: Number(editUser?.id_tipo) }}
          className={styles.form}
        >
          <Select
            name="id_tipo"
            label="Privilégios"
            options={[
              { value: 3, label: 'Super' },
              { value: 2, label: 'Administrador' },
              { value: 1, label: 'Comum' },
            ]}
            value={Number(editUser?.id_tipo)}
            // eslint-disable-next-line no-return-assign
            onChange={e =>
              setEditUser({
                email: String(editUser?.email),
                id_tipo: Number(e.target.value),
              })}
          />
        </Form>
      </Modal>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Usuários</h1>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de cadastro</th>
                    <th>Tipo</th>
                    {login?.id_tipo === 3 && <th>Ações</th>}
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
                      {login?.id_tipo === 3 && (
                        <td>
                          <div className={styles.actions}>
                            <Button
                              icon={MdEdit}
                              onClick={() =>
                                handleModal(Number(user.id_usuario))
                              }
                            >
                              Editar privilégios
                            </Button>
                          </div>
                        </td>
                      )}
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

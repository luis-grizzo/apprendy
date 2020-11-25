/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { MdEdit, MdDateRange, MdFavorite, MdBook } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import CardPanel from '../../components/CardPanel';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './User.module.sass';

import userImage from '../../assets/user.png';
import testImage from '../../assets/testImage.jpg';
import api from '../../services/api';
import user from '../Content/User';
import { getToken } from '../../auth/token';

interface Params {
  id: string;
}

interface ContentData {
  publicacao: {
    id_conteudo: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

interface UserData {
  user: {
    id_usuario: number;
    nome: string;
    foto_perfil: string;
    texto_perfil: string;
    capa_perfil: string;
    id_tipo: number;
    data_entrada: string;
  };
  likes: Array<ContentData>;
  contents: Array<ContentData>;
}

const User: React.FC = () => {
  const params = useParams() as Params;
  const [modalOpen, setModalOpen] = useState(false);

  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    api
      .get(`/users/${params.id}/info`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(() => {
        setInfoLoading('404 - User Not Found');
      });
  }, [params.id]);

  const handleModal = () => {
    setModalOpen(!modalOpen);
    console.log('Novo valor - user page', modalOpen);
  };

  const handleUserUpdate = (data: Record<string, unknown>) => {
    console.log(data);
  };

  if (!userData) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h2>{infoLoading}</h2>
      </div>
    );
  }

  return (
    <>
      <Modal open={modalOpen} title="Alterar dados da conta">
        <Form onSubmit={handleUserUpdate}>
          <p>banana</p>
        </Form>
      </Modal>
      <Navbar logged={!!getToken()} />
      <Parallax
        className={styles.parallax}
        bgImage={
          userData.user.capa_perfil ? userData.user.capa_perfil : testImage
        }
        strength={500}
        contentClassName={styles.parallaxContent}
      />
      <main>
        <section className="section containerFluid">
          <CardPanel className={`${styles.userInfo}`}>
            <div className={styles.top}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    userData.user.foto_perfil
                      ? userData.user.foto_perfil
                      : userImage
                  }
                  alt="Name"
                  className={styles.img}
                />
              </div>
              <Button
                type="button"
                icon={MdEdit}
                variant="outline"
                className={styles.button}
                onClick={handleModal}
              >
                Editar perfil
              </Button>
            </div>
            <div className={styles.description}>
              <h1 className={styles.name}>{userData.user.nome}</h1>
              <div className={styles.details}>
                <MdDateRange className={styles.icon} />
                {`Entrou em ${userData.user.data_entrada}`}
                <span className={styles.dot} />
                <MdBook className={styles.icon} />
                {`${userData.contents.length} Recursos`}
                <span className={styles.dot} />
                <MdFavorite className={styles.icon} />
                {`${userData.likes.length} Favoritos`}
              </div>
              <p className={styles.bio}>{userData.user.texto_perfil}</p>
            </div>
          </CardPanel>
        </section>
        <section className="section container">
          <h2 className={styles.title}>
            Favoritos de
            {` ${userData.user.nome}`}
          </h2>
          <div className="gridAuto">
            {userData.likes.map(post => (
              <Card
                key={post.publicacao.id_conteudo}
                postId={post.publicacao.id_conteudo}
                image={post.publicacao.imagem}
                title={post.publicacao.titulo}
                date={post.publicacao.data_publicacao}
                description={post.publicacao.descricao}
                tags={post.tag}
              />
            ))}
          </div>
        </section>
        <section className="section container">
          <h2 className={styles.title}>
            Recursos de
            {` ${userData.user.nome}`}
          </h2>
          <div className="gridAuto">
            {userData.contents.map(post => (
              <Card
                key={post.publicacao.id_conteudo}
                postId={post.publicacao.id_conteudo}
                image={post.publicacao.imagem}
                title={post.publicacao.titulo}
                date={post.publicacao.data_publicacao}
                description={post.publicacao.descricao}
                tags={post.tag}
              />
            ))}
          </div>
          <Pagination pageCount={30} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;

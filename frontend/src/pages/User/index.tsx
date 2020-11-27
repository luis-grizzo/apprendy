/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  MdEdit,
  MdDateRange,
  MdFavorite,
  MdBook,
  MdSave,
  MdSecurity,
} from 'react-icons/md';

import { displayErrors } from '../../util/error';
import api from '../../services/api';
import { uploadFile } from '../../util/upload';

import Modal from '../../components/Modal';
import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import CardPanel from '../../components/CardPanel';
import Card from '../../components/Card';
// import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './User.module.sass';

import noUserImage from '../../assets/noUserImage.jpg';
import testImage from '../../assets/defaultBackground.png';

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
    email: string;
    foto_perfil: string;
    texto_perfil: string;
    capa_perfil: string;
    id_tipo: number;
    data_entrada: string;
  };
  likes: Array<ContentData>;
  contents: Array<ContentData>;
}

interface Login {
  id_usuario: number;
}

interface PerguntaSeguranca {
  pergunta_seguranca: string;
}

const User: React.FC = () => {
  const params = useParams() as Params;

  const [modalAccount, setModalAccount] = useState(false);
  const [modalSecurity, setModalSecurity] = useState(false);
  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [userData, setUserData] = useState<UserData>();
  const [securityQuestion, setSecurityQuestion] = useState<PerguntaSeguranca>();
  const [login, setLogin] = useState<Login>();

  console.log('Dados', userData);

  const formRef: any = useRef<FormHandles>(null);
  const formRefSecurity: any = useRef<FormHandles>(null);

  useEffect(() => {
    api
      .get(`/users/${params.id}/info`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(() => {
        setInfoLoading('404 - User Not Found');
      });

    api.get('/users/home/info').then(response => {
      setLogin(response.data);
    });
  }, [params.id]);

  const handleModalAccount = () => {
    setModalAccount(!modalAccount);
  };

  const handleModalSecurity = () => {
    api
      .get(`/users/secutiry/answer?email=${userData?.user.email}`)
      .then(response => {
        setSecurityQuestion(response.data);
      });

    setModalSecurity(!modalSecurity);
  };

  const handleUserUpdate = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      console.log('Formulário update dados', data);

      if (data.foto_perfil === undefined) {
        data.foto_perfil = userData?.user.foto_perfil;
      } else {
        data.foto_perfil = await uploadFile(data.foto_perfil as File);
      }

      if (data.capa_perfil === undefined) {
        data.capa_perfil = userData?.user.capa_perfil;
      } else {
        data.capa_perfil = await uploadFile(data.capa_perfil as File);
      }

      const schema = Yup.object().shape({
        nome: Yup.string().required('Este compo é obrigatório'),
        email: Yup.string().required('Este compo é obrigatório'),
        texto_perfil: Yup.string().required('Este compo é obrigatório'),
        foto_perfil: Yup.object()
          .shape({
            type: Yup.string().required('A imagem é obrigatória'),
          })
          .nullable(),
        capa_perfil: Yup.object()
          .shape({
            type: Yup.string().required('A imagem é obrigatória'),
          })
          .nullable(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put('/users', data);
      toast.success('✅ Perfil atualizado com sucesso!');

      formRef.current.reset();
      window.location.href = `http://localhost:3000/user/${params.id}`;
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao autalizar o perfil!');
    }
  };

  const handleSecurityUpdate = async (data: Record<string, unknown>) => {
    try {
      formRef.current.setErrors({});

      console.log('Formulário update segurança', data);

      const schema = Yup.object().shape({
        pergunta_seguranca: Yup.string().required('Este compo é obrigatório'),
        resposta_seguranca: Yup.string().required('Este compo é obrigatório'),
        senha: Yup.string().required('Este compo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put('/users/security', data);
      toast.success('✅ Segurança atualizada com sucesso!');

      formRefSecurity.current.reset();
      setModalSecurity(!modalSecurity);
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao autalizar a segurança!');
    }
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
      <Modal
        open={modalSecurity}
        title="Alterar dados de segurança"
        headerContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button
            icon={MdSave}
            variant="contrast"
            onClick={() => formRefSecurity.current.submitForm()}
          >
            Salvar Alterações
          </Button>
        }
      >
        <Form
          ref={formRefSecurity}
          onSubmit={handleSecurityUpdate}
          className={styles.form}
          initialData={userData.user}
        >
          <Input
            name="pergunta_seguranca"
            label="Pergunta de segurança"
            value={securityQuestion?.pergunta_seguranca}
            onChange={e =>
              setSecurityQuestion({
                pergunta_seguranca: String(e.target.value),
              })}
            className={styles.input}
            containerClass={styles.noMar}
          />
          <Input
            name="resposta_seguranca"
            label="Resposta"
            type="password"
            placeholder="********"
            className={styles.input}
            containerClass={styles.noMar}
          />
          <Input
            name="senha"
            label="Senha"
            type="password"
            placeholder="********"
            className={styles.input}
            containerClass={`${styles.noMar} ${styles.fullLine}`}
          />
        </Form>
      </Modal>
      <Modal
        open={modalAccount}
        title="Alterar dados da conta"
        headerContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button
            icon={MdSave}
            variant="contrast"
            onClick={() => formRef.current.submitForm()}
          >
            Salvar perfil
          </Button>
        }
      >
        <Form
          ref={formRef}
          onSubmit={handleUserUpdate}
          className={styles.form}
          initialData={userData.user}
        >
          <Input
            name="nome"
            label="Nome"
            className={styles.input}
            containerClass={styles.noMar}
          />
          <Input
            name="email"
            label="Email"
            className={styles.input}
            containerClass={styles.noMar}
          />
          <Input
            name="texto_perfil"
            label="Bio"
            className={styles.input}
            containerClass={`${styles.noMar} ${styles.fullLine}`}
          />
          <InputFile
            name="foto_perfil"
            label="Foto de perfil"
            containerClass={styles.noMar}
          />
          <InputFile
            name="capa_perfil"
            label="Foto de capa"
            containerClass={styles.noMar}
          />
        </Form>
      </Modal>
      <Navbar logged />
      <Parallax
        className={styles.parallax}
        bgImage={
          userData.user.capa_perfil ? userData.user.capa_perfil : testImage
        }
        strength={500}
        contentClassName={styles.parallaxContent}
      />
      <main>
        <section
          className={`${styles.section} ${styles.containerFluid} ${styles.noPadBot}`}
        >
          <CardPanel className={`${styles.userInfo}`}>
            <div className={styles.top}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    userData.user.foto_perfil
                      ? userData.user.foto_perfil
                      : noUserImage
                  }
                  alt="Name"
                  className={styles.img}
                />
              </div>
              {login?.id_usuario === userData.user.id_usuario && (
                <div className={styles.buttonsWrapper}>
                  <Button
                    type="button"
                    icon={MdEdit}
                    className={styles.button}
                    onClick={handleModalAccount}
                  >
                    Editar perfil
                  </Button>
                  <Button
                    type="button"
                    icon={MdSecurity}
                    className={styles.button}
                    variant="contrast"
                    onClick={handleModalSecurity}
                  >
                    Segurança
                  </Button>
                </div>
              )}
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
              {userData.user.texto_perfil && (
                <p className={styles.bio}>{userData.user.texto_perfil}</p>
              )}
            </div>
          </CardPanel>
        </section>
        <section className="section container">
          <h2 className={styles.title}>
            Favoritos de
            {` ${userData.user.nome}`}
          </h2>
          {console.log(userData.likes === [])}
          {userData.likes === [] ? (
            <div className="gridAuto">
              {userData.likes.map(post => (
                <Card
                  key={post.publicacao.id_conteudo}
                  postId={post.publicacao.id_conteudo}
                  image={post.publicacao.imagem}
                  title={post.publicacao.titulo}
                  date={post.publicacao.data_publicacao}
                  description={post.publicacao.descricao}
                  imageBg
                />
              ))}
            </div>
          ) : (
            <p className={styles.noResources}>
              {/* eslint-disable-next-line no-useless-escape */}
              {`${userData.user.nome} não tem posts favoritos ainda. 🤔`}
            </p>
          )}
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
                // tags={post.tag}
              />
            ))}
          </div>
          {/* <Pagination pageCount={30} /> */}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;

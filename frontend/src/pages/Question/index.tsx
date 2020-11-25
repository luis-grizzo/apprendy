/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowDownward, MdArrowUpward, MdSend } from 'react-icons/md';

import { useAlert } from 'react-alert';
import Navbar from '../../components/Navbar';
import CardPanel from '../../components/CardPanel';
import Input from '../../components/Input';
import Footer from '../../components/Footer';

import styles from './Question.module.sass';

import userImage from '../../assets/user.png';
import Button from '../../components/Button';
import api from '../../services/api';

interface IParams {
  id: string;
}

interface TopicoProps {
  id_topico_comunidade: number;
  titulo: string;
  conteudo: string;
  ativo: number;
  aberto: number;
  data_publicacao: string;
  id_usuario: number;
  usuarios_nome: string;
}

interface RespostaProps {
  id_resposta_topico: number;
  conteudo: string;
  data_publicacao: string;
  votos: number;
  id_usuario: number;
  usuarios_nome: string;
  foto_perfil: string;
}

interface UserProperties {
  foto_perfil: string;
  nome: string;
}

const Question: React.FC = () => {
  const params = useParams() as IParams;
  const alertView = useAlert();

  const [topic, setTopic] = useState<TopicoProps>();
  const [respostas, setRespostas] = useState<Array<RespostaProps>>([]);
  const [user, setUser] = useState<UserProperties>({
    nome: '',
    foto_perfil: '',
  });

  useEffect(() => {
    api.get(`/comunidade/topico/${params.id}`).then(response => {
      setTopic(response.data);
    });

    api.get(`/comunidade/resposta/${params.id}`).then(response => {
      const data = response.data as Array<RespostaProps>;
      const sort = data.sort((a, b) => b.votos - a.votos);
      setRespostas(sort);
    });

    api.get('/users/home/info').then(response => {
      setUser(response.data);
    });
  }, [params.id]);

  async function handleIncreaseVoto(resposta: number) {
    await api.post(`/comunidade/votos/${resposta}`);

    setRespostas([...respostas]);
  }

  async function handleDecraseVoto(resposta: number) {
    await api.delete(`/comunidade/votos/${resposta}`);

    setRespostas([...respostas]);
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!data.comentario) {
      alertView.info('Adicione um comentario antes');
      return;
    }

    const dt = {
      conteudo: data.comentario,
    };

    try {
      const response = await api.post(`/comunidade/resposta/${params.id}`, dt);

      const resposta = {
        id_resposta_topico: response.data.id,
        conteudo: response.data.conteudo,
        data_publicacao: 'alguns minutos atrás',
        votos: 0,
        id_usuario: response.data.id_usuario,
        usuarios_nome: user.nome,
        foto_perfil: user.foto_perfil,
      };

      setRespostas([...respostas, resposta]);
    } catch (e) {
      alertView.error('Algum erro aconteceu! tente novamente.');
    }
  };

  if (!topic) {
    return <h1>Post não Encotrado!</h1>;
  }

  return (
    <>
      <Navbar logged />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.header}>
              <h1 className={styles.title}>{topic.titulo}</h1>
              <div className={styles.infos}>
                <span className={styles.info}>
                  {`Questão de ${topic.usuarios_nome}`}
                </span>
                <span className={styles.info}>
                  {`Publicado em ${topic.data_publicacao}`}
                </span>
                <span
                  className={`${styles.status} ${
                    topic.aberto ? styles.open : styles.done
                  }`}
                >
                  {topic.aberto ? 'Aberto' : 'Respondida'}
                </span>
              </div>
            </article>
            <article className={styles.content}>{topic.conteudo}</article>
            {respostas.map(resposta => (
              <CardPanel
                key={resposta.id_resposta_topico}
                image={resposta.foto_perfil ? resposta.foto_perfil : userImage}
                imageAlt="Name"
                className={styles.commentCard}
              >
                <div className={styles.cardContent}>
                  <div className={styles.infos}>
                    <Link to={`/user/${resposta.id_usuario}`}>
                      <h3 className={styles.name}>{resposta.usuarios_nome}</h3>
                    </Link>
                    <span className={styles.info}>
                      {`Em ${resposta.data_publicacao}`}
                    </span>
                    <span className={styles.votes}>
                      <Button
                        onClick={() => {
                          // eslint-disable-next-line no-param-reassign
                          resposta.votos += 1;
                          handleIncreaseVoto(resposta.id_resposta_topico);
                        }}
                        icon={MdArrowUpward}
                        className={styles.upVote}
                      />
                      <span className={styles.number}>{resposta.votos}</span>
                      <Button
                        onClick={() => {
                          // eslint-disable-next-line no-param-reassign
                          resposta.votos -= 1;
                          handleDecraseVoto(resposta.id_resposta_topico);
                        }}
                        icon={MdArrowDownward}
                        className={styles.downVote}
                      />
                    </span>
                  </div>
                  <p className={styles.text}>{resposta.conteudo}</p>
                </div>
              </CardPanel>
            ))}
            <CardPanel
              className={styles.commentCard}
              image={user.foto_perfil ? user.foto_perfil : userImage}
              imageAlt="name"
            >
              <Form onSubmit={handleSubmit} className={styles.commentForm}>
                <Input
                  name="comentario"
                  label="Deixe um comentário"
                  placeholder="Sua mensagem..."
                  containerClass={styles.inputContainer}
                  button
                  buttonClass={styles.button}
                  buttonIcon={MdSend}
                  className={styles.input}
                />
              </Form>
            </CardPanel>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Question;

/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { MdToday, MdFavorite, MdSend } from 'react-icons/md';

import { useAlert } from 'react-alert';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CardPanel from '../../components/CardPanel';
import Footer from '../../components/Footer';

import styles from './Post.module.sass';

import backgroundImage from '../../assets/testImage.jpg';
import userDfImg from '../../assets/user.png';
import api from '../../services/api';
import tags from '../Admin/Tags';
import { getToken } from '../../auth/token';

interface Params {
  id: string;
}

interface ContentData {
  publicacao: {
    likes: number;
    id_conteudo: number;
    id_usuario: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
    conteudo: string;
    usuario_nome: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

interface HasLikedData {
  HasLiked: boolean;
}

interface CommentaryProps {
  id_comentario: number;
  conteudo: string;
  data_publicacao: string;
  id_usuario: number;
  id_conteudo: number;
  usuario_nome: string;
  usuario_foto: string;
}

interface UserProperties {
  foto_perfil: string;
  nome: string;
}

const Post: React.FC = () => {
  const params = useParams() as Params;
  const alertView = useAlert();

  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [post, setPost] = useState<ContentData>();
  const [hasliked, setHasliked] = useState(false);
  const [likeTimeout, setLikeTImeout] = useState(false);
  const [commentaries, setCommentaries] = useState<Array<CommentaryProps>>([]);
  const [user, setUser] = useState<UserProperties>({
    nome: '',
    foto_perfil: '',
  });

  useEffect(() => {
    api.get('/users/home/info').then(response => {
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/conteudos/${params.id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(() => {
        setInfoLoading('404 - Publicação não encontrada!');
      });

    api.get(`/comentarios/${params.id}`).then(response => {
      setCommentaries(response.data);
    });

    api.get(`/conteudos/likes/${params.id}`).then(response => {
      const data = response.data as HasLikedData;

      setHasliked(data.HasLiked);
    });
  }, [params.id]);

  if (!post) {
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

  function handleTimeoutLike() {
    setLikeTImeout(true);

    setTimeout(() => {
      setLikeTImeout(false);
    }, 3000);
  }

  async function handleLikePost() {
    const logado = getToken();

    if (!logado) {
      alertView.info('Faça login, para continuar!');
      return;
    }

    if (likeTimeout) {
      alertView.info('Opss... Você acabou de clicar no like, espere um pouco!');

      return;
    }

    if (hasliked) {
      handleUnlikePost();

      return;
    }

    if (!post) return;

    try {
      await api.post(`/conteudos/likes/${params.id}`);

      const like = post.publicacao.likes + 1;
      setPost({ ...post, publicacao: { ...post.publicacao, likes: like } });
      setHasliked(true);
      handleTimeoutLike();
    } catch (e) {
      alertView.error('Aconteceu algum erro! Tente novamente.');
    }
  }

  async function handleUnlikePost() {
    try {
      await api.delete(`/conteudos/likes/${params.id}`);

      if (!post) return;

      const unlike = post.publicacao.likes - 1;
      setPost({ ...post, publicacao: { ...post.publicacao, likes: unlike } });
      setHasliked(false);
      handleTimeoutLike();
    } catch (e) {
      alertView.error('Aconteceu algum erro! Tente novamente.');
    }
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    const logado = getToken();

    if (!logado) {
      alertView.info('Faça login, para continuar!');
      return;
    }

    if (!data.comentario) {
      alertView.info('Adicione um comentario antes');
      return;
    }

    const dt = {
      conteudo: data.comentario,
    };

    try {
      const response = await api.post(`/comentarios/${params.id}`, dt);

      const resposta = {
        id_comentario: response.data.id,
        conteudo: response.data.conteudo,
        data_publicacao: 'alguns minutos atrás',
        id_usuario: response.data.id_usuario,
        id_conteudo: response.data.id_conteudo,
        usuario_nome: user.nome,
        usuario_foto: user.foto_perfil,
      };

      setCommentaries([...commentaries, resposta]);
    } catch (e) {
      alertView.error('Algum erro aconteceu! tente novamente.');
    }
  };

  return (
    <>
      <Navbar logged={!!getToken()} />
      <header>
        <Parallax
          className={styles.parallax}
          contentClassName={styles.container}
          bgImage={
            post.publicacao.imagem ? post.publicacao.imagem : backgroundImage
          }
          strength={500}
        >
          <h1 className={styles.title}>{post.publicacao.titulo}</h1>
        </Parallax>
      </header>
      <main className="container">
        <section className="section">
          <CardPanel
            className={styles.postCard}
            image={userDfImg}
            imageAlt="name"
          >
            <div className={styles.authorInfos}>
              <Link to={`/user/${post.publicacao.id_usuario}`}>
                <h2 className={styles.name}>{post.publicacao.usuario_nome}</h2>
              </Link>
              <div className={styles.postInfos}>
                <span className={styles.date}>
                  <MdToday className={styles.icon} />
                  {post.publicacao.data_publicacao}
                </span>
                <span className="dot" />
                <span className={styles.likes}>
                  <MdFavorite className={styles.icon} />
                  {post.publicacao.likes}
                </span>
              </div>
            </div>
            <div className={styles.related}>
              <h3 className={styles.description}>Tags relacionadas</h3>
              <div className={styles.tagsWrapper}>
                {post.tag.map(tag => (
                  <Link
                    key={tag.id_tag}
                    className={styles.tag}
                    to={`/search/${tag.id_tag}`}
                  >
                    {tag.descritivo}
                  </Link>
                ))}
              </div>
            </div>
            <Button
              icon={MdFavorite}
              iconClass={styles.icon}
              className={`${styles.button} ${hasliked && styles.favorite}`}
              onClick={handleLikePost}
            />
          </CardPanel>
        </section>
        <section className={`section ${styles.content}`}>
          {post.publicacao.conteudo}
        </section>
        <section className="section">
          {commentaries.map(commentary => (
            <CardPanel
              key={commentary.id_comentario}
              className={styles.commentCard}
              image={
                commentary.usuario_foto ? commentary.usuario_foto : userDfImg
              }
              imageAlt="name"
            >
              <div className={styles.content}>
                <div className={styles.infos}>
                  <Link to={`/user/${commentary.id_usuario}`}>
                    <h3 className={styles.name}>{commentary.usuario_nome}</h3>
                  </Link>
                  <span className="dot" />
                  <span className={styles.date}>
                    {`Em ${commentary.data_publicacao}`}
                  </span>
                </div>
                <p>{commentary.conteudo}</p>
              </div>
            </CardPanel>
          ))}
          <CardPanel
            className={styles.commentCard}
            image={user.foto_perfil ? user.foto_perfil : userDfImg}
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Post;

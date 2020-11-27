/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { Markup } from 'interweave';
import { FormHandles } from '@unform/core';
import { MdToday, MdFavorite, MdSend } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { displayErrors } from '../../util/error';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CardPanel from '../../components/CardPanel';
// import Textarea from '../../components/Textarea';
import Footer from '../../components/Footer';

import styles from './Post.module.sass';

import backgroundImage from '../../assets/defaultBackground.png';

// import tags from '../Admin/Tags';

interface Params {
  id: string;
}

interface ContentData {
  publicacao: {
    likes: number;
    id_conteudo: number;
    id_usuario: number;
    id_ferramenta: number;
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

interface User {
  nome: string;
  foto_perfil: string;
}

interface Comment {
  id_comentario: number;
  conteudo: string;
  data_publicacao: string;
  id_usuario: number;
  id_conteudo: number;
  usuario_nome: string;
  usuario_foto: string;
}

interface Login {
  foto_perfil: string;
}

interface Ferramenta {
  id_ferramenta: number;
  descritivo: string;
  icone: string;
  id_categoria: number;
}

const Post: React.FC = () => {
  const params = useParams() as Params;

  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [autor, setAutor] = useState<User>();
  const [login, setLogin] = useState<Login>();
  const [post, setPost] = useState<ContentData>();
  const [ferramenta, setFerramenta] = useState<Ferramenta>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [conteudoComentario, setConteudoComentario] = useState<string>('');

  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    (async () => {
      const response = await api.get<ContentData>(`/conteudos/${params.id}`);
      const getAutor = await api.get(
        `/users/${response.data.publicacao.id_usuario}/info`,
      );
      const getComments = await api.get(
        `/comentarios/${response.data.publicacao.id_conteudo}`,
      );
      const getFerramenta = await api.get(
        `/ferramentas?id_ferramenta=${response.data.publicacao.id_ferramenta}`,
      );
      setPost(response.data);
      setAutor(getAutor.data.user);
      setComments(getComments.data);
      setFerramenta(getFerramenta.data);
    })();

    api.get('/users/home/info').then(response => {
      setLogin(response.data);
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

  const handleCommentSubmit = (data: Record<string, unknown>) => {
    try {
      data.conteudo = conteudoComentario;

      api.post(`/comentarios/${post.publicacao.id_conteudo}`, data);
      toast.success('✅ Comentário adicionado com sucesso!');
      formRef.current.reset();
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao adicionar o comentário!');
    }
  };

  return (
    <>
      <Navbar logged />
      <header>
        <Parallax
          className={styles.parallax}
          contentClassName={styles.container}
          bgImage={
            post.publicacao.imagem ? post.publicacao.imagem : backgroundImage
          }
          strength={150}
        >
          <h1 className={styles.title}>{post.publicacao.titulo}</h1>
        </Parallax>
      </header>
      <main className="container">
        <section className="section">
          <CardPanel
            className={styles.postCard}
            image={autor?.foto_perfil}
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
              <h3 className={styles.description}>Ferramenta</h3>
              <div className={styles.tool}>
                <div className={styles.iconeWrapper}>
                  <img src={ferramenta?.icone} alt="" className={styles.img} />
                </div>
                <h6 className={styles.toolName}>{ferramenta?.descritivo}</h6>
              </div>
              {/* <div className={styles.tagsWrapper}>
                {post.tag.map(tag => (
                  <Link
                    key={tag.id_tag}
                    className={styles.tag}
                    to={`/search/${tag.id_tag}`}
                  >
                    {tag.descritivo}
                  </Link>
                ))}
              </div> */}
            </div>
            <Button
              icon={MdFavorite}
              iconClass={styles.icon}
              className={styles.button}
            />
          </CardPanel>
        </section>

        <section className={`section ${styles.content}`}>
          <Markup content={post.publicacao.conteudo} />
        </section>
        <section className="section">
          {comments.map(comment => (
            <CardPanel
              className={styles.commentCard}
              image={comment.usuario_foto}
              imageAlt={comment.usuario_nome}
            >
              <div className={styles.content}>
                <div className={styles.infos}>
                  <Link to={`/user/${comment.id_usuario}`}>
                    <h3 className={styles.name}>{comment.usuario_nome}</h3>
                  </Link>
                  <span className="dot" />
                  <span className={styles.date}>{comment.data_publicacao}</span>
                </div>
                <p>{comment.conteudo}</p>
              </div>
            </CardPanel>
          ))}
          <CardPanel
            className={styles.commentCard}
            image={login?.foto_perfil}
            imageAlt="name"
          >
            <Form
              ref={formRef}
              onSubmit={handleCommentSubmit}
              className={styles.commentForm}
            >
              <Input
                name="conteudo"
                label="Comentário"
                placeholder="O que você achou deste recurso?"
                value={conteudoComentario}
                onChange={e => setConteudoComentario(e.target.value)}
                className={styles.input}
                button
                buttonType="submit"
                buttonIcon={MdSend}
                buttonClass={styles.inputButton}
                containerClass={styles.textareaContainer}
              />
              {/* <Textarea
                name="conteudo"
                label="Comentário"
                placeholder="Seu comentário..."
                value={conteudoComentario}
                onChange={e => setConteudoComentario(e.target.value)}
                containerClass={styles.textareaContainer}
              /> */}
              {/* <Button type="submit" icon={MdSend}>
                Adicionar comentário
              </Button> */}
            </Form>
          </CardPanel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Post;

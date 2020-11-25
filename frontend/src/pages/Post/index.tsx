/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { Markup } from 'interweave';
import { MdToday, MdFavorite, MdSend } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CardPanel from '../../components/CardPanel';
import Footer from '../../components/Footer';

import styles from './Post.module.sass';

import backgroundImage from '../../assets/defaultBackground.png';
import commentImage from '../../assets/noUserImage.jpg';
import api from '../../services/api';
import tags from '../Admin/Tags';
import Textarea from '../../components/Textarea';

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

const Post: React.FC = () => {
  const params = useParams() as Params;

  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [post, setPost] = useState<ContentData>();

  useEffect(() => {
    api
      .get(`/conteudos/${params.id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(() => {
        setInfoLoading('404 - Publicação não encontrada!');
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

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
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
          strength={500}
        >
          <h1 className={styles.title}>{post.publicacao.titulo}</h1>
        </Parallax>
      </header>
      <main className="container">
        <section className="section">
          <CardPanel
            className={styles.postCard}
            image={commentImage}
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
              className={styles.button}
            />
          </CardPanel>
        </section>

        <section className={`section ${styles.content}`}>
          <Markup content={post.publicacao.conteudo} />
        </section>
        <section className="section">
          <CardPanel
            className={styles.commentCard}
            image={commentImage}
            imageAlt="name"
          >
            <div className={styles.content}>
              <div className={styles.infos}>
                <Link to="/user/123">
                  <h3 className={styles.name}>Roberta Souza</h3>
                </Link>
                <span className="dot" />
                <span className={styles.date}>Em 01 Jan, 2020</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                soluta sunt ullam adipisci beatae deserunt explicabo nobis
                delectus, ab nulla enim, accusantium debitis culpa totam vero
                doloribus magni esse! Facilis!
              </p>
            </div>
          </CardPanel>
          <CardPanel
            className={styles.commentCard}
            image={commentImage}
            imageAlt="name"
          >
            <Form onSubmit={handleSubmit} className={styles.commentForm}>
              <Textarea
                name="comentario"
                label="Comentário"
                placeholder="Seu comentário..."
                containerClass={styles.textareaContainer}
              />
              <Button type="submit" icon={MdSend}>
                Adicionar comentário
              </Button>
            </Form>
          </CardPanel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Post;

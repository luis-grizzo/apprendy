/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { MdSearch, MdArrowDownward } from 'react-icons/md';
import { Form } from '@unform/web';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Carousel from '../../components/Caroussel';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Home.module.sass';
import homeHeader from '../../assets/testImage2.jpg';

import api from '../../services/api';

interface PostProperties {
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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProperties[]>([]);

  useEffect(() => {
    api.get('/conteudos').then(response => {
      setPosts(response.data);
    });
  }, []);

  function handleGetFeatured() {
    const postFeatured: Array<PostProperties> = [];

    posts.forEach(post => {
      const isFeatured = post.tag.filter(featured => {
        return featured.descritivo.toLocaleLowerCase().includes('destaque');
      });

      if (isFeatured.length > 0) {
        postFeatured.push(post);
      }
    });

    return postFeatured;
  }

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <>
      <Navbar logged />
      <header>
        <Parallax
          bgImage={homeHeader}
          strength={200}
          contentClassName={`${styles.container} ${styles.parallaxContent}`}
        >
          <aside className={styles.aside}>
            <h1 className={styles.titleMain}>Apprendy</h1>
            <h2 className={styles.subTitleMain}>
              Repositório de recursos educaionais digitais.
              <br />
              Encontre o que procura e aprenda o que precisa na Apprendy!
            </h2>
            <Form onSubmit={handleSubmit} className={styles.homeForm}>
              <Input
                name="homeSearch"
                containerClass={styles.inputContainer}
                className={styles.input}
                type="text"
                placeholder="O que você procura?"
                select
                selectOptions={[
                  { value: 'recursos', label: 'Recursos', selected: true },
                  { value: 'ferramentas', label: 'Ferramentas' },
                  { value: 'categorias', label: 'Categorias' },
                  { value: 'tags', label: 'Tags' },
                ]}
                selectClass={styles.inputSelect}
                button
                buttonClass={styles.inputButton}
                buttonIcon={MdSearch}
              />
            </Form>
          </aside>
          <div className={styles.bottomContent}>
            <p>Deslize para ver ferrementas, destaques e novos recursos!</p>
            <MdArrowDownward className={styles.icon} />
          </div>
        </Parallax>
      </header>
      <section className="section container">
        <h2 className={styles.title}>Destaques</h2>
        <Carousel contents={handleGetFeatured()} />
      </section>
      <section className="section container">
        <h2 className={styles.title}>Ultimos posts</h2>
        <div className="gridAuto">
          {posts.map(post => (
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
      <Footer />
    </>
  );
};

export default Home;

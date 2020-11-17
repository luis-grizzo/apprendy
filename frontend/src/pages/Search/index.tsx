/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Switch from '../../components/Switch';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Search.module.sass';
import api from '../../services/api';

interface CategoriesProps {
  id_categoria: number;
  descritivo: string;
}

interface TagsProps {
  id_tag: number;
  descritivo: string;
}

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

const Search: React.FC = () => {
  const params = useLocation();
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [tags, setTags] = useState<Array<TagsProps>>([]);
  const [posts, setPosts] = useState<PostProperties[]>([]);
  const [tagsSelecteds, setTagsSelecteds] = useState<Array<string>>([]);

  useEffect(() => {
    api.get('/categorias?limit=6').then(response => {
      setCategories(response.data);
    });

    api.get('/tags?limit=10').then(response => {
      setTags(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/conteudos/${params.search}`)
      .then(response => setPosts(response.data));
  }, [params.search]);

  function handleSwitchTag(index: number, tag: any) {
    console.log(index, tag);
  }

  return (
    <>
      <Navbar logged admin />
      <main className={`${styles.gridHalf} ${styles.searchGrid}`}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.container}>
            <div className={styles.filterGroup}>
              <h2 className={styles.title}>Categorias</h2>
              {categories.map((category, index) => (
                <Switch
                  key={category.id_categoria}
                  label={category.descritivo}
                  isChecked={
                    `?category=${category.id_categoria}` === params.search
                  }
                />
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.title}>Tags</h2>
              {tags.map((tag, index) => (
                <Switch
                  key={tag.id_tag}
                  label={tag.descritivo}
                  isChecked={`?tags=${tag.id_tag}` === params.search}
                  onChange={() => handleSwitchTag(index, tag.id_tag)}
                />
              ))}
            </div>
          </div>
        </aside>
        <section className={`${styles.section} ${styles.container}`}>
          <div className={`${styles.gridAuto} ${styles.cardsGrid}`}>
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
      </main>
      <Footer />
    </>
  );
};

export default Search;

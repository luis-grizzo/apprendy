/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Navbar from '../../components/Navbar';
import Switch from '../../components/Switch';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Search.module.sass';
import api from '../../services/api';
import { getToken } from '../../auth/token';

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
    categoria: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

const Search: React.FC = () => {
  const params = useLocation();
  const alertView = useAlert();

  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [tags, setTags] = useState<Array<TagsProps>>([]);
  const [posts, setPosts] = useState<PostProperties[]>([]);
  const [postFilter, setPostFilter] = useState<PostProperties[]>([]);
  const [tagsSelecteds, setTagsSelecteds] = useState<Array<number>>([]);
  const [categorySelecteds, setCategorySelecteds] = useState<Array<string>>([]);

  useEffect(() => {
    api.get('/categorias?limit=6').then(response => {
      setCategories(response.data);
    });

    api.get('/tags?limit=10').then(response => {
      setTags(response.data);
    });

    api.get(`/conteudos`).then(response => {
      setPosts(response.data);
      setPostFilter(response.data);
    });
  }, []);

  useEffect(() => {
    const value = params.search.replace(/\D/gi, '');
    const type = params.search.replace(/\?|=|\d/gi, '');

    if (type === 'tags') {
      setTagsSelecteds([Number(value)]);
    } else if (type === 'category') {
      const catSelect = categories.find(
        category => category.id_categoria === Number(value),
      );

      if (catSelect) {
        setCategorySelecteds([catSelect.descritivo]);
      }
    } else {
      api.get(`/conteudos${params.search}`).then(response => {
        setPosts(response.data);
        setPostFilter(response.data);
      });
    }
  }, [categories, params.search]);

  useEffect(() => {
    if (tagsSelecteds.length === 0 || categorySelecteds.length > 0) {
      setPostFilter(posts);

      return;
    }

    const filterPost = posts.filter(post => {
      const tagEquals = post.tag.filter(tag => {
        const isEquals = tagsSelecteds.filter(
          tagSelect => tagSelect === tag.id_tag,
        );

        return isEquals.length > 0;
      });

      const existCategory = categorySelecteds.find(
        catSelect => catSelect === post.publicacao.categoria,
      );

      return tagEquals.length > 0 || existCategory;
    });

    setPostFilter(filterPost);
  }, [posts, tagsSelecteds, categorySelecteds]);

  function handleSwitchTag(tag: number) {
    const findTag = tagsSelecteds.find(tagSelect => tagSelect === tag);

    if (findTag) {
      const filteredTags = tagsSelecteds.filter(tagSelect => tagSelect !== tag);

      setTagsSelecteds(filteredTags);

      return;
    }

    setTagsSelecteds([...tagsSelecteds, tag]);
  }

  function handleSwitchCategory(category: string) {
    const findTag = categorySelecteds.find(catSelect => catSelect === category);

    if (findTag) {
      const filteredCategory = categorySelecteds.filter(
        catSelect => catSelect !== category,
      );

      setCategorySelecteds(filteredCategory);

      return;
    }

    setCategorySelecteds([...categorySelecteds, category]);
  }

  return (
    <>
      <Navbar logged={!!getToken()} />
      <main className={`${styles.gridHalf} ${styles.searchGrid}`}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.container}>
            <div className={styles.filterGroup}>
              <h2 className={styles.title}>Categorias</h2>
              {categories.map(category => (
                <Switch
                  key={category.id_categoria}
                  label={category.descritivo}
                  isChecked={
                    `?category=${category.id_categoria}` === params.search
                  }
                  onChange={() => handleSwitchCategory(category.descritivo)}
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
                  onChange={() => handleSwitchTag(tag.id_tag)}
                />
              ))}
            </div>
          </div>
        </aside>
        <section className={`${styles.section} ${styles.container}`}>
          <div className={`${styles.gridAuto} ${styles.cardsGrid}`}>
            {postFilter.map(post => (
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

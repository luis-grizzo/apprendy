/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import styles from './Footer.module.sass';

interface CategoriesProps {
  id_categoria: number;
  descritivo: string;
}

interface TagsProps {
  id_tag: number;
  descritivo: string;
}

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [tags, setTags] = useState<Array<TagsProps>>([]);

  useEffect(() => {
    api.get('/categorias?limit=6').then(response => {
      setCategories(response.data);
    });

    api.get('/tags?limit=6').then(response => {
      setTags(response.data);
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.gridFooter}>
          <div className={styles.info}>
            <img className={styles.logo} src={logo} alt="Logo Apprendy" />
            <p>
              A Apprendy é uma plataforma de estudos gerais, entre e descubra
              sobre tudo aquilo que conheçe e que não conheçe!
            </p>
          </div>
          <div className={styles.content}>
            <h3 className={`h3 ${styles.title}`}>Categorias</h3>
            <div className={styles.linksWrapper}>
              {categories.map(category => (
                <Link
                  key={category.id_categoria}
                  className={styles.link}
                  to={{
                    pathname: '/search',
                    search: `category=${category.id_categoria}`,
                  }}
                >
                  {category.descritivo}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={`h3 ${styles.title}`}>Tags</h3>
            <div className={styles.linksWrapper}>
              {tags.map(tag => (
                <Link
                  key={tag.id_tag}
                  className={styles.link}
                  to={{
                    pathname: '/search',
                    search: `tags=${tag.id_tag}`,
                  }}
                >
                  {tag.descritivo}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className="container">
          <p>&copy; Apprendy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

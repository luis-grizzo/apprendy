import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import styles from './Footer.module.sass';

const Footer: React.FC = () => {
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
              <Link className={styles.link} to="/search/123">
                Item
              </Link>
              <Link className={styles.link} to="/search/123">
                Item large
              </Link>
              <Link className={styles.link} to="/search/123">
                Item very large
              </Link>
              <Link className={styles.link} to="/search/123">
                foo
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={`h3 ${styles.title}`}>Tags</h3>
            <div className={styles.linksWrapper}>
              <Link className={styles.link} to="/search/123">
                Item
              </Link>
              <Link className={styles.link} to="/search/123">
                Item large
              </Link>
              <Link className={styles.link} to="/search/123">
                Item very large
              </Link>
              <Link className={styles.link} to="/search/123">
                foo
              </Link>
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

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdBook, MdBuild, MdChat, MdList, MdPeople } from 'react-icons/md';

import styles from '../Admin.module.sass';

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <h2 className={styles.title}>Painel administrativo</h2>
        </li>
        <li className={styles.divider} />
        <li>
          <Link
            to="/admin/resources"
            className={`${styles.link} ${
              /admin?\/resources/.test(location.pathname) && styles.active
            }`}
          >
            <MdBook className={styles.icon} />
            Recursos
          </Link>
        </li>
        <li className={styles.divider} />
        <li>
          <Link
            to="/admin/comments"
            className={`${styles.link} ${
              /admin?\/comments/.test(location.pathname) && styles.active
            }`}
          >
            <MdChat className={styles.icon} />
            Comentários
          </Link>
        </li>
        {/* <li className={styles.divider} /> */}
        {/* <li>
          <Link
            to="/admin/tags"
            className={`${styles.link} ${
              /admin?\/tags/.test(location.pathname) && styles.active
            }`}
          >
            <MdBookmark className={styles.icon} />
            Tags
          </Link>
        </li> */}
        <li className={styles.divider} />
        <li>
          <Link
            to="/admin/tools"
            className={`${styles.link} ${
              /admin?\/tools/.test(location.pathname) && styles.active
            }`}
          >
            <MdBuild className={styles.icon} />
            Ferramentas
          </Link>
        </li>
        <li className={styles.divider} />
        <li>
          <Link
            to="/admin/categories"
            className={`${styles.link} ${
              /admin?\/categories/.test(location.pathname) && styles.active
            }`}
          >
            <MdList className={styles.icon} />
            Categorias
          </Link>
        </li>
        <li className={styles.divider} />
        <li>
          <Link
            to="/admin/users"
            className={`${styles.link} ${
              /admin?\/users/.test(location.pathname) && styles.active
            }`}
          >
            <MdPeople className={styles.icon} />
            Usuários
          </Link>
        </li>
        {/* <li className={styles.divider} />
        <li>
          <Link
            to="/admin/questions"
            className={`${styles.link} ${
              /admin?\/questions/.test(location.pathname) && styles.active
            }`}
          >
            <MdChat className={styles.icon} />
            Perguntas
          </Link>
        </li> */}
        <li className={styles.divider} />
      </ul>
    </aside>
  );
};

export default Menu;

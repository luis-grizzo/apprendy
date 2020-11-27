import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdBook,
  MdBookmark,
  MdBuild,
  MdChat,
  MdList,
  MdPeople,
} from 'react-icons/md';

import api from '../../../services/api';

import styles from '../Content.module.sass';

interface Login {
  id_tipo: string;
}

const Menu: React.FC = () => {
  const [login, setLogin] = useState<Login>();

  useEffect(() => {
    api.get('/users/home/info').then(response => {
      setLogin(response.data);
    });
  }, []);

  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <h2 className={styles.title}>Criação de conteúdo</h2>
        </li>
        <li className={styles.divider} />
        <li>
          <Link
            to="/content/resource"
            className={`${styles.link} ${
              /content?\/resource/.test(location.pathname) && styles.active
            }`}
          >
            <MdBook className={styles.icon} />
            Recursos
          </Link>
        </li>
        <li className={styles.divider} />
        {/* <li>
          <Link
            to="/content/tag"
            className={`${styles.link} ${
              /content?\/tag/.test(location.pathname) && styles.active
            }`}
          >
            <MdBookmark className={styles.icon} />
            Tags
          </Link>
        </li>
        <li className={styles.divider} /> */}
        {Number(login?.id_tipo) !== 1 && (
          <>
            <li>
              <Link
                to="/content/tool"
                className={`${styles.link} ${
                  /content?\/tool/.test(location.pathname) && styles.active
                }`}
              >
                <MdBuild className={styles.icon} />
                Ferramentas
              </Link>
            </li>
            <li className={styles.divider} />
            <li>
              <Link
                to="/content/category"
                className={`${styles.link} ${
                  /content?\/category/.test(location.pathname) && styles.active
                }`}
              >
                <MdList className={styles.icon} />
                Categorias
              </Link>
            </li>
            <li className={styles.divider} />
          </>
        )}
        {/* <li>
          <Link
            to="/content/user"
            className={`${styles.link} ${
              /content?\/user/.test(location.pathname) && styles.active
            }`}
          >
            <MdPeople className={styles.icon} />
            Usuários
          </Link>
        </li>
        <li className={styles.divider} /> */}
        {/* <li>
          <Link
            to="/content/question"
            className={`${styles.link} ${
              /content?\/question/.test(location.pathname) && styles.active
            }`}
          >
            <MdChat className={styles.icon} />
            Perguntas
          </Link>
        </li>
        <li className={styles.divider} /> */}
      </ul>
    </aside>
  );
};

export default Menu;

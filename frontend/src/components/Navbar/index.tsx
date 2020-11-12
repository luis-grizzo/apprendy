import React, { useState } from 'react';
import {
  MdSearch,
  MdAccountBox,
  MdPersonAdd,
  MdDashboard,
  MdAdd,
  MdPeople,
  MdPowerSettingsNew,
} from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import Input from '../Input';
import Button from '../Button';

import styles from './Navbar.module.sass';

import logo from '../../assets/logo.svg';
import userImage from '../../assets/user.jpg';
import background from '../../assets/testImage.jpg';
import { logout } from '../../auth/token';

interface NavbarProps {
  logged?: boolean;
  admin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ logged, admin }) => {
  const [sidenav, setSidenav] = useState(false);

  const history = useHistory();

  const handleSidenav = () => {
    setSidenav(!sidenav);
  };

  function handleLogout() {
    logout();
  }

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
    history.push(`/search/${data.search}`);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navbarWrapper}`}>
          <Link to="/" className={styles.logoWrapper}>
            <img className={styles.logo} src={logo} alt="Logo Apprendy" />
          </Link>
          <div className={`${styles.content} ${logged && styles.logged}`}>
            <Form onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="search"
                className={styles.input}
                type="text"
                placeholder="Pesquisar"
                select
                selectOptions={[
                  { value: 'recursos', label: 'Recursos', selected: true },
                  { value: 'ferramentas', label: 'Ferramentas' },
                  { value: 'categorias', label: 'Categorias' },
                  { value: 'tags', label: 'Tags' },
                ]}
                button
                buttonIcon={MdSearch}
              />
            </Form>
            <div className={styles.buttonsWrapper}>
              {admin && (
                <Link to="/admin/resources" className={styles.link}>
                  <Button type="button" variant="contrast" icon={MdDashboard}>
                    Painel adm
                  </Button>
                </Link>
              )}
              {logged && (
                <Link to="/content/resource" className={styles.link}>
                  <Button type="button" disabled={!logged} icon={MdAdd}>
                    Criar conteúdo
                  </Button>
                </Link>
              )}
              <Link to="/comunity" className={styles.link}>
                <Button type="button" variant="outline" icon={MdPeople}>
                  Comunidade
                </Button>
              </Link>
            </div>
            {logged ? (
              <button
                type="button"
                onClick={handleSidenav}
                className={styles.userButtonWrapper}
              >
                <div className={styles.userButton}>
                  <img
                    className={styles.img}
                    src={userImage}
                    alt="User avatar"
                  />
                </div>
              </button>
            ) : (
              <>
                <div className={styles.linksWrapper}>
                  <Link to="/login" className={styles.link}>
                    <Button icon={MdAccountBox}>Login</Button>
                  </Link>
                  <Link to="/cadastro" className={styles.link}>
                    <Button icon={MdPersonAdd} variant="outline">
                      Cadastre-se
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {logged && (
        <>
          <aside className={`${styles.sidenav} ${sidenav && styles.active}`}>
            <ul>
              <li className={styles.userInfos}>
                <div className={styles.userBackground}>
                  <img
                    src={background}
                    alt="Capa de { name }"
                    className={styles.img}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.userImage}>
                    <img
                      src={userImage}
                      alt="{ name }"
                      className={styles.img}
                    />
                  </div>
                  <span className={styles.name}>Joana Da Silva</span>
                </div>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to="/user/123" className={styles.link}>
                  <MdAccountBox className={styles.icon} />
                  Meu perfil
                </Link>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to="/content/resource" className={styles.link}>
                  <MdAdd className={styles.icon} />
                  Criar conteúdo
                </Link>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to="/comunity" className={styles.link}>
                  <MdPeople className={styles.icon} />
                  Comunidade
                </Link>
              </li>
              <li className={styles.divider} />
              {admin && (
                <>
                  <li>
                    <Link to="/admin/resources" className={styles.link}>
                      <MdDashboard className={styles.icon} />
                      Painel Administrativo
                    </Link>
                  </li>
                  <li className={styles.divider} />
                </>
              )}
              <li>
                <Link
                  to="/login"
                  className={styles.link}
                  onClick={handleLogout}
                >
                  <MdPowerSettingsNew className={styles.icon} />
                  Sair
                </Link>
              </li>
              <li className={styles.divider} />
            </ul>
          </aside>
          <div
            className={`${styles.overlay} ${sidenav ? styles.active : ''}`}
            role="button"
            aria-label="Fechar sidenav"
            tabIndex={0}
            onClick={handleSidenav}
            onKeyUp={handleSidenav}
          />
        </>
      )}
    </>
  );
};

export default Navbar;

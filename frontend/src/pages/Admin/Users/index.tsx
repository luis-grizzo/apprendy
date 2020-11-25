import React from 'react';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

const users: React.FC = () => {
  return (
    <>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Usuários</h1>
            </div>
            <div className="comment">
              Aqui será inserido a tabela com as informações desta parte
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default users;

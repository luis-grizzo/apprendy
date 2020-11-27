import React from 'react';
import { MdSend } from 'react-icons/md';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

const question: React.FC = () => {
  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Pergunta</h1>
              <Button type="button" icon={MdSend}>
                Criar Pergunta
              </Button>
            </div>
            <div className="comment">
              Aqui será inserido o formulário com as informações desta parte
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default question;

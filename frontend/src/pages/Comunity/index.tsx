import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Switch from '../../components/Switch';
import CardPanel from '../../components/CardPanel';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Comunity.module.sass';

const Comunity: React.FC = () => {
  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.container}>
            <div className={styles.filterGroup}>
              <h3 className={styles.title}>Categorias</h3>
              <Switch name="categoria1" label="Categoria 1" />
              <Switch name="categoria2" label="Categoria 1" />
              <Switch name="categoria3" label="Categoria 1" />
              <Switch name="categoria4" label="Categoria 1" />
            </div>
          </div>
        </aside>
        <section className={`${styles.section} ${styles.content}`}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              Pergunte e responda para a comunidade
            </h1>
            <div className={styles.gridAuto}>
              <Link to="/question/123">
                <CardPanel className={styles.questionCard}>
                  <div className={styles.values}>
                    <div className={styles.awnsers}>
                      <span className={styles.number}>10</span>
                      <span className={styles.description}>Respostas</span>
                    </div>
                    <div className={styles.votes}>
                      <span className={styles.number}>30</span>
                      <span className={styles.description}>Votos</span>
                    </div>
                  </div>
                  <div className={styles.infos}>
                    <h2 className={styles.title}>
                      Arrow functions do javascript
                      <span className={styles.status}>Ativo</span>
                    </h2>
                    <div className={styles.tagsContainer}>
                      <span className={styles.tag}>Programação</span>
                    </div>
                  </div>
                </CardPanel>
              </Link>
              <Link to="/question/123">
                <CardPanel className={styles.questionCard}>
                  <div className={styles.values}>
                    <div className={styles.awnsers}>
                      <span className={styles.number}>10</span>
                      <span className={styles.description}>Respostas</span>
                    </div>
                    <div className={styles.votes}>
                      <span className={styles.number}>30</span>
                      <span className={styles.description}>Votos</span>
                    </div>
                  </div>
                  <div className={styles.infos}>
                    <h2 className={styles.title}>
                      Arrow functions do javascript
                      <span className={styles.status}>Ativo</span>
                    </h2>
                    <div className={styles.tagsContainer}>
                      <span className={styles.tag}>Programação</span>
                    </div>
                  </div>
                </CardPanel>
              </Link>
              <Link to="/question/123">
                <CardPanel className={styles.questionCard}>
                  <div className={styles.values}>
                    <div className={styles.awnsers}>
                      <span className={styles.number}>10</span>
                      <span className={styles.description}>Respostas</span>
                    </div>
                    <div className={styles.votes}>
                      <span className={styles.number}>30</span>
                      <span className={styles.description}>Votos</span>
                    </div>
                  </div>
                  <div className={styles.infos}>
                    <h2 className={styles.title}>
                      Arrow functions do javascript
                      <span className={styles.status}>Ativo</span>
                    </h2>
                    <div className={styles.tagsContainer}>
                      <span className={styles.tag}>Programação</span>
                    </div>
                  </div>
                </CardPanel>
              </Link>
              <Link to="/question/123">
                <CardPanel className={styles.questionCard}>
                  <div className={styles.values}>
                    <div className={styles.awnsers}>
                      <span className={styles.number}>10</span>
                      <span className={styles.description}>Respostas</span>
                    </div>
                    <div className={styles.votes}>
                      <span className={styles.number}>30</span>
                      <span className={styles.description}>Votos</span>
                    </div>
                  </div>
                  <div className={styles.infos}>
                    <h2 className={styles.title}>
                      Arrow functions do javascript
                      <span className={styles.status}>Ativo</span>
                    </h2>
                    <div className={styles.tagsContainer}>
                      <span className={styles.tag}>Programação</span>
                    </div>
                  </div>
                </CardPanel>
              </Link>
              <Link to="/question/123">
                <CardPanel className={styles.questionCard}>
                  <div className={styles.values}>
                    <div className={styles.awnsers}>
                      <span className={styles.number}>10</span>
                      <span className={styles.description}>Respostas</span>
                    </div>
                    <div className={styles.votes}>
                      <span className={styles.number}>30</span>
                      <span className={styles.description}>Votos</span>
                    </div>
                  </div>
                  <div className={styles.infos}>
                    <h2 className={styles.title}>
                      Arrow functions do javascript
                      <span className={styles.status}>Ativo</span>
                    </h2>
                    <div className={styles.tagsContainer}>
                      <span className={styles.tag}>Programação</span>
                    </div>
                  </div>
                </CardPanel>
              </Link>
            </div>
            <Pagination pageCount={30} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Comunity;

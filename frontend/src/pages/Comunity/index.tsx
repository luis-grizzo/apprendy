/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Switch from '../../components/Switch';
import CardPanel from '../../components/CardPanel';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Comunity.module.sass';
import api from '../../services/api';

interface CategoriesProps {
  id_categoria: number;
  descritivo: string;
}

interface TopicoProps {
  id_topico_comunidade: number;
  titulo: string;
  ativo: boolean;
  aberto: boolean;
  data_publicacao: string;
  id_usuario: number;
  usuarios_nome: string;
  respostas: string;
  votos: number;
}

const Comunity: React.FC = () => {
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [topics, setTopics] = useState<Array<TopicoProps>>([]);

  useEffect(() => {
    api.get('/categorias?limit=6').then(response => {
      setCategories(response.data);
    });

    api.get('/comunidade/topico').then(response => {
      setTopics(response.data);
    });
  }, []);

  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.container}>
            <div className={styles.filterGroup}>
              <h3 className={styles.title}>Categorias</h3>
              {categories.map(category => (
                <Switch
                  key={category.id_categoria}
                  label={category.descritivo}
                />
              ))}
            </div>
          </div>
        </aside>
        <section className={`${styles.section} ${styles.content}`}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              Pergunte e responda para a comunidade
            </h1>
            <div className={styles.gridAuto}>
              {topics.map(topic => (
                <Link
                  key={topic.id_topico_comunidade}
                  to={`/question/${topic.id_topico_comunidade}`}
                >
                  <CardPanel className={styles.questionCard}>
                    <div className={styles.values}>
                      <div className={styles.awnsers}>
                        <span className={styles.number}>{topic.respostas}</span>
                        <span className={styles.description}>Respostas</span>
                      </div>
                      <div className={styles.votes}>
                        <span className={styles.number}>{topic.votos}</span>
                        <span className={styles.description}>Votos</span>
                      </div>
                    </div>
                    <div className={styles.infos}>
                      <h2 className={styles.title}>
                        {topic.titulo}
                        <span className={styles.status}>
                          {topic.aberto ? 'Ativo' : 'Fechado'}
                        </span>
                      </h2>
                      <div className={styles.tagsContainer}>
                        <span className={styles.tag}>Programação</span>
                      </div>
                    </div>
                  </CardPanel>
                </Link>
              ))}
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

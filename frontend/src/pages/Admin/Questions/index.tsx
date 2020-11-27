/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface Question {
  id_topico_comunidade: number;
  titulo: string;
  conteudo: string;
  ativo: number;
  aberto: number;
  data_publicacao: string;
  id_usuario: number;
  usuarios_nome: string;
  respostas: number;
}

const questions: React.FC = () => {
  const [questionContent, setQuestionContent] = useState<Question[]>([]);

  useEffect(() => {
    api.get<Question[]>('/comunidade/topico?limit=100000').then(response => {
      setQuestionContent(response.data);
    });
  }, []);

  return (
    <>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Perguntas</h1>
              <Link to="/content/question">
                <Button type="button" variant="contrast" icon={MdAdd}>
                  Criar Pergunta
                </Button>
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Conteudo</th>
                    <th>Ativo</th>
                    <th>Aberto</th>
                    <th>Data de publicação</th>
                    <th>Autor</th>
                    <th>Respostas</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {questionContent.map(question => (
                    <tr>
                      <td>{question.id_topico_comunidade}</td>
                      <td>
                        {question.titulo &&
                          `${question.titulo.substring(0, 30)}...`}
                      </td>
                      <td>
                        {question.conteudo &&
                          `${question.conteudo.substring(0, 30)}...`}
                      </td>
                      <td>{question.ativo === 1 ? 'Ativo' : 'Inativo'}</td>
                      <td>{question.aberto === 1 ? 'Aberto' : 'Fechado'}</td>
                      <td>{question.data_publicacao}</td>
                      <td>{question.usuarios_nome}</td>
                      <td>{question.respostas}</td>
                      <td className={styles.actionsTd}>
                        <Link
                          to={`/post/${question.id_usuario}/edit`}
                          className={styles.action}
                        >
                          <Button icon={MdEdit}>Editar</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default questions;

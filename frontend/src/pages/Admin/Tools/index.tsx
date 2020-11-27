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

interface Tools {
  id_ferramenta: number;
  descritivo: string;
  id_categoria: string;
}

const tools: React.FC = () => {
  const [toolsContent, setToolsContent] = useState<Tools[]>([]);

  useEffect(() => {
    api.get<Tools[]>('/ferramentas?limit=1000000').then(response => {
      setToolsContent(response.data);
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
              <h1 className={styles.title}>Ferramentas</h1>
              <Link to="/content/tool">
                <Button type="button" variant="contrast" icon={MdAdd}>
                  Criar Ferramenta
                </Button>
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {toolsContent.map(tool => (
                    <tr>
                      <td>{tool.id_ferramenta}</td>
                      <td>{tool.descritivo}</td>
                      <td>{tool.id_categoria}</td>
                      <td className={styles.actionsTd}>
                        <Link
                          to={`/edit/tool/${tool.id_ferramenta}`}
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

export default tools;

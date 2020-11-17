import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAlert as RcAlert } from 'react-alert';
import { Form } from '@unform/web';
import { MdSend, MdUndo } from 'react-icons/md';

import CardPanel from '../../components/CardPanel';
import Input from '../../components/Input';

import styles from './Cadastro.module.sass';

import logo from '../../assets/logo.svg';
import image from '../../assets/cadastro.png';
import Button from '../../components/Button';
import api from '../../services/api';
import { setToken } from '../../auth/token';

const Cadastro: React.FC = () => {
  const history = useHistory();
  const alertMsg = RcAlert();

  const handleSubmit = async (data: Record<string, string>) => {
    if (data.fullName.length <= 0) {
      return alertMsg.info('Digite seu nome!');
    }

    const isEmail = data.email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/g);

    if (!isEmail) {
      return alertMsg.info('Digite um email valido!');
    }

    if (data.password.length < 8) {
      return alertMsg.info('Digite uma senha com no minimo 8 digitos');
    }

    const datas = {
      email: data.email,
      nome: data.fullName,
      senha: data.password,
    };

    const security = {
      pergunta_seguranca: data.securityQuestion,
      resposta: data.securityAwnser,
      senha: data.password,
    };

    try {
      const response = await api.post('/signup', datas);

      setToken(response.data.token);

      await api.put('/users/security', security);

      return history.push('/');
    } catch (e) {
      const response = e.response.data;

      if (response.error) {
        return alertMsg.error(response.error);
      }

      alertMsg.error('Aconteceu um erro, tente novamente!');
    }
  };

  return (
    <>
      <main className={`gridHalf ${styles.gridAdjusts}`}>
        <article
          className={`section ${styles.containerFluid} ${styles.content}`}
        >
          <h1 className={styles.title}>Novo cadastro</h1>
          <CardPanel className={styles.card}>
            <Form onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="fullName"
                type="text"
                label="Nome completo"
                placeholder="João da Silva"
                className={styles.input}
              />
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="exemplo@exemplo.com"
                className={styles.input}
              />
              <Input
                name="password"
                type="password"
                label="Senha"
                className={styles.input}
              />
              <Input
                name="securityQuestion"
                type="text"
                label="Pergunta de segurança"
                placeholder="Em qual cidade passei a infância?"
                className={styles.input}
              />
              <Input
                name="securityAwnser"
                type="text"
                label="Resposta"
                placeholder="Jaú"
                className={styles.input}
              />
              <div className={styles.formFooter}>
                <Link to="/" className={`${styles.button} ${styles.outline}`}>
                  <MdUndo className={styles.icon} />
                  Voltar para a home
                </Link>
                <Button type="submit" icon={MdSend}>
                  Cadastrar
                </Button>
              </div>
            </Form>
          </CardPanel>
          <p className={styles.downText}>
            Já tem uma conta?
            <Link className={`primaryD3Text ${styles.link}`} to="/login">
              Fazer login!
            </Link>
          </p>
        </article>
        <aside className={`section ${styles.ilustration}`}>
          <nav className={styles.nav}>
            <Link className={styles.wrapper} to="/">
              <img className={styles.logo} src={logo} alt="Logo Apprendy" />
            </Link>
          </nav>
          <img
            className={styles.image}
            src={image}
            alt="person with graphycs"
          />
        </aside>
      </main>
    </>
  );
};

export default Cadastro;

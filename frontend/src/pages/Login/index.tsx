import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdAccountCircle, MdSend, MdLockOpen, MdUndo } from 'react-icons/md';

import CardPanel from '../../components/CardPanel';
import Input from '../../components/Input';

import styles from './Login.module.sass';

import logo from '../../assets/logo.svg';
import image from '../../assets/login.png';
import Button from '../../components/Button';
import api from '../../services/api';
import { setToken } from '../../auth/token';

const Login: React.FC = () => {
  const history = useHistory();

  const [error, setError] = useState(false);
  const [tokenForgot, setTokenForgot] = useState('');
  const [loginForm, setLoginForm] = useState(true);
  const [questionForm, setQuestionForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);
  const [email, setEmail] = useState('');
  const [answerSecurity, setAnswerSecurity] = useState('');

  const handleLoginSubmit = async (data: Record<string, unknown>) => {
    try {
      const response = await api.post('/signin', data);

      setToken(response.data.token);

      history.push('/home');
    } catch (e) {
      setError(true);
    }
  };

  const handleQuestionSubmit = async (data: Record<string, unknown>) => {
    const datas = {
      email: data.email,
      pergunta_seguranca: data.pergunta,
      resposta: data.resposta,
    };

    try {
      const response = await api.post('/forgot', datas);

      setTokenForgot(response.data.token);

      handleNewPasswordForm();
    } catch (e) {
      alert('Verifique sua Resposta!');
    }
  };

  const handleNewPasswordSubmit = async (data: Record<string, string>) => {
    if (data.novaSenha !== data.novaSenhaRepetir) {
      return alert('Senhas não correspondente, verifiquei suas senhas!');
    }

    if (data.novaSenha.length < 8) {
      return alert('A senha precisa ter no minimo 8 caracteres');
    }

    const datas = {
      senha: data.novaSenha,
    };

    try {
      setToken(tokenForgot);

      await api.patch('/changePassword', datas);

      history.push('/home');
    } catch (e) {
      alert('Aconteceu algum erro, tente novamente!');
    }
  };

  const handleQuestionForm = () => {
    setLoginForm(!loginForm);
    setQuestionForm(!questionForm);
  };

  const handleNewPasswordForm = () => {
    setQuestionForm(!questionForm);
    setPasswordForm(!passwordForm);
  };

  async function handleGetAnswerSecurity() {
    if (email.length === 0) return;

    const response = await api.get(`/users/secutiry/answer?email=${email}`);

    if (!response.data.pergunta_seguranca) {
      alert('Verifique o seu e-mail!');

      return;
    }

    setAnswerSecurity(response.data.pergunta_seguranca);
  }

  return (
    <>
      <main className={`gridHalf ${styles.gridAdjusts}`}>
        <article
          className={`section ${styles.containerFluid} ${styles.content}`}
        >
          <h1 className={styles.title}>
            {(questionForm && 'Responda sua P.S.') ||
              (passwordForm && 'Redefinir senha') ||
              'Realizar login'}
          </h1>
          <CardPanel className={styles.card}>
            <Form
              onSubmit={handleLoginSubmit}
              className={`${styles.loginForm} ${loginForm && styles.active}`}
            >
              <Input
                name="email"
                type="text"
                label="Email"
                placeholder="exemplo@exemplo.com"
                className={styles.input}
                style={error ? { border: '1px solid red' } : {}}
              />
              <Input
                name="senha"
                type="password"
                label="Senha"
                className={styles.input}
                style={error ? { border: '1px solid red' } : {}}
              />
              <div className={styles.formFooter}>
                <Button
                  type="button"
                  onClick={handleQuestionForm}
                  variant="outline"
                  icon={MdLockOpen}
                >
                  Esqueci a senha
                </Button>
                <Button type="submit" icon={MdAccountCircle}>
                  Logar
                </Button>
              </div>
            </Form>
            <Form
              onSubmit={handleQuestionSubmit}
              className={`${styles.questionForm} ${
                questionForm && styles.active
              } ${passwordForm && styles.passwordFormActive}`}
            >
              <Input
                name="email"
                type="text"
                label="Email"
                placeholder="exemplo@exemplo.com"
                className={styles.input}
                onChange={e => setEmail(e.target.value)}
                style={error ? { border: '1px solid red' } : {}}
              />
              <Input
                name="pergunta"
                type="text"
                label="Pergunta de segurança"
                placeholder="Clique aqui para obter a pergunta!"
                className={styles.input}
                value={answerSecurity}
                onClick={handleGetAnswerSecurity}
              />
              <Input
                name="resposta"
                type="text"
                label="Resposta"
                placeholder="Sua resposta"
                className={styles.input}
              />
              <div className={styles.formFooter}>
                <Button
                  type="button"
                  onClick={handleQuestionForm}
                  variant="outline"
                  icon={MdUndo}
                >
                  Voltar
                </Button>
                <Button type="submit" icon={MdSend}>
                  Enviar
                </Button>
              </div>
            </Form>
            <Form
              onSubmit={handleNewPasswordSubmit}
              className={`${styles.passwordForm} ${
                passwordForm && styles.active
              }`}
            >
              <Input
                name="novaSenha"
                type="password"
                label="Nova senha"
                className={styles.input}
              />
              <Input
                name="novaSenhaRepetir"
                type="password"
                label="Repita a senha"
                className={styles.input}
              />
              <div className={styles.formFooter}>
                <Button
                  type="button"
                  onClick={handleNewPasswordForm}
                  variant="outline"
                  icon={MdUndo}
                >
                  Voltar
                </Button>
                <Button type="submit" icon={MdSend}>
                  Redefinir senha
                </Button>
              </div>
            </Form>
          </CardPanel>
          <p className={styles.downText}>
            Não tem uma conta?
            <Link className={styles.link} to="/cadastro">
              Cadastre-se!
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
            alt="person editing wireframe"
          />
        </aside>
      </main>
    </>
  );
};

export default Login;

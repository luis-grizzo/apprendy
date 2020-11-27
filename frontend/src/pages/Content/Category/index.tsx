/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MdAdd } from 'react-icons/md';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Footer from '../../../components/Footer';

import styles from '../Content.module.sass';

const category: React.FC = () => {
  const formRef: any = useRef<FormHandles>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        descritivo: Yup.string()
          .required('Este compo é obrigatório')
          .min(3, 'Este campo deve conter ao minimo 3 caracteres.'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/categorias', data);
      toast.success('✅ Categoria cadastrada com sucesso!');

      formRef.current.reset();
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao cadastrar a categoria!');
    }
  };

  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Categoria</h1>
              <Button
                type="button"
                variant="contrast"
                icon={MdAdd}
                onClick={() => formRef.current.submitForm()}
              >
                Adicionar Categoria
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="descritivo"
                label="Descritivo"
                placeholder="Ex: Editor de vídeos"
                className={styles.input}
                containerClass={styles.fullLine}
              />
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default category;

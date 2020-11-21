/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdAdd } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Content.module.sass';

const tag: React.FC = () => {
  const formRef: any = useRef<FormHandles>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        descritivo: Yup.string()
          .required('Este compo é obrigatório')
          .min(3, 'Este campo deve conter ao minimo 3 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/tags', data);
      toast.success('✅ Tag cadastrada com sucesso!');

      formRef.current.reset();
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao cadastrar a Tag!');
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
              <h1>Tag</h1>
              <Button
                type="button"
                icon={MdAdd}
                size="large"
                onClick={() => formRef.current.submitForm()}
              >
                Adicionar Tag
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="descritivo"
                label="Descritivo"
                placeholder="Ex: Programação"
                containerClass={styles.fullLine}
                className={styles.input}
              />
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default tag;

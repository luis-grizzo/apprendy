/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdAdd } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import InputFile from '../../../components/InputFile';
import Footer from '../../../components/Footer';

import styles from '../Content.module.sass';

interface CategoriaResponse {
  id_categoria: number;
  descritivo: string;
}

interface CategoriaOptions {
  value: number;
  label: string;
  selected?: boolean;
}

const tool: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaOptions[]>([]);

  const formRef: any = useRef<FormHandles>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        descritivo: Yup.string()
          .required('Este compo é obrigatório')
          .min(3, 'Este campo deve conter ao minimo 3 caracteres'),
        id_categoria: Yup.number().moreThan(0, 'Este campo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/tags', data);
      toast.success('✅ Ferramenta cadastrada com sucesso!');

      formRef.current.reset();
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao cadastrar a Ferramenta!');
    }
  };

  useEffect(() => {
    api.get<CategoriaResponse[]>('/categorias?limit=10').then(response => {
      const formattedCategorias = response.data.map(tag => ({
        value: tag.id_categoria,
        label: tag.descritivo,
      }));
      setCategorias(formattedCategorias);
    });
  }, []);

  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Ferramenta</h1>
              <Button
                type="button"
                variant="contrast"
                size="large"
                icon={MdAdd}
                onClick={() => formRef.current.submitForm()}
              >
                Adicionar Ferramenta
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="descritivo"
                label="Descritivo"
                placeholder="Ex: Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.noMar} ${styles.fullLine}`}
              />
              <Select
                name="id_categoria"
                label="Categoria"
                options={categorias}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <InputFile
                name="icone"
                label="Icone"
                containerClass={styles.noMar}
              />
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default tool;

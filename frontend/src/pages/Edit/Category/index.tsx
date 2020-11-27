/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MdSave } from 'react-icons/md';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

interface Params {
  id: string;
}

const category: React.FC = () => {
  const params = useParams() as Params;
  const [editCategory, setEditCategory] = useState<any>();
  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api.get(`/categorias?limit=1&id_categoria=${params.id}`).then(response => {
      setEditCategory(response.data.descritivo);
    });
  }, [params.id]);

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

      await api.put(`/categorias/${params.id}`, data);
      toast.success('✅ Categoria editada com sucesso!');

      formRef.current.reset();
      window.location.href = 'http://localhost:3000/admin/categories';
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao editar a categoria!');
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
              <h1 className={styles.title}>Editar categoria</h1>
              <Button
                type="button"
                variant="contrast"
                icon={MdSave}
                onClick={() => formRef.current.submitForm()}
              >
                Salvar
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="descritivo"
                label="Descritivo"
                placeholder="Ex: Editor de vídeos"
                value={editCategory}
                className={styles.input}
                containerClass={styles.fullLine}
                onChange={e => setEditCategory(e.target.value)}
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

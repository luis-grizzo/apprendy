/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdEdit } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

interface Params {
  id: string;
}

const tag: React.FC = () => {
  const params = useParams() as Params;
  const [editTag, setEdiTag] = useState<any>();
  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api.get(`/tags?limit=1&id_tag=${params.id}`).then(response => {
      setEdiTag(response.data.descritivo);
    });
  }, [params.id]);

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

      await api.put(`/tags/${params.id}`, data);
      toast.success('✅ Tag editada com sucesso!');

      formRef.current.reset();
      window.location.href = 'http://localhost:3000/admin/tags';
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao editar a Tag!');
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
              <h1 className={styles.title}>Tag</h1>
              <Button
                type="button"
                icon={MdEdit}
                variant="contrast"
                onClick={() => formRef.current.submitForm()}
              >
                Editar Tag
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="descritivo"
                label="Descritivo"
                placeholder="Ex: Programação"
                value={editTag}
                containerClass={styles.fullLine}
                className={styles.input}
                onChange={e => setEdiTag(e.target.value)}
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

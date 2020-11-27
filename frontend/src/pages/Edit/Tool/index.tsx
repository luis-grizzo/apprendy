/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';
import { uploadFile } from '../../../util/upload';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import InputFile from '../../../components/InputFile';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

interface Params {
  id: string;
}

interface Ferramenta {
  id_ferramenta?: number;
  descritivo?: string;
  icone?: string;
  id_categoria?: number;
}

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
  const params = useParams() as Params;
  const [editFerramenta, setEditFerramenta] = useState<Ferramenta>();
  const [categorias, setCategorias] = useState<CategoriaOptions[]>([]);
  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api
      .get(`/ferramentas?limit=1&id_ferramenta=${params.id}`)
      .then(response => {
        setEditFerramenta(response.data);
      });
  }, [params.id]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      console.log('Formulário', data);

      if (data.icone === undefined) {
        data.icone = editFerramenta?.icone;
      } else {
        data.icone = await uploadFile(data.icone as File);
      }

      const schema = Yup.object().shape({
        descritivo: Yup.string()
          .required('Este compo é obrigatório')
          .min(3, 'Este campo deve conter ao minimo 3 caracteres'),
        id_categoria: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        icone: Yup.object()
          .shape({
            type: Yup.string().required('A imagem é obrigatória'),
          })
          .nullable(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/ferramentas/${params.id}`, data);
      toast.success('✅ Ferramenta editada com sucesso!');

      formRef.current.reset();
      window.location.href = 'http://localhost:3000/admin/tools';
    } catch (err) {
      displayErrors(err, formRef);
      console.log(err, formRef);
      toast.error('❌ Erro ao editar a Ferramenta!');
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
              <h1 className={styles.title}>Editar ferramenta</h1>
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
                placeholder="Ex: Visual Studio Code"
                value={editFerramenta?.descritivo}
                onChange={e =>
                  setEditFerramenta({
                    id_ferramenta: editFerramenta?.id_ferramenta,
                    descritivo: e.target.value,
                    id_categoria: editFerramenta?.id_categoria,
                    icone: editFerramenta?.icone,
                  })
                }
                className={styles.input}
                containerClass={`${styles.noMar} ${styles.fullLine}`}
              />
              <Select
                name="id_categoria"
                label="Categoria"
                options={categorias}
                initialDefaultValue
                value={editFerramenta?.id_categoria}
                onChange={e =>
                  setEditFerramenta({
                    id_ferramenta: editFerramenta?.id_ferramenta,
                    descritivo: editFerramenta?.descritivo,
                    id_categoria: Number(e.target.value),
                    icone: editFerramenta?.icone,
                  })
                }
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={`${styles.noMar} ${styles.fullLine}`}
              />
              <InputFile
                name="icone"
                label="Icone"
                previewSrc={editFerramenta?.icone}
                containerClass={`${styles.noMar} ${styles.fullLine}`}
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

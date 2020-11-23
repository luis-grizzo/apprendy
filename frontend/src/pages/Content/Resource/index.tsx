/* eslint-disable no-multi-str */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdSend } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputFile from '../../../components/InputFile';
import Select from '../../../components/Select';
import Footer from '../../../components/Footer';

import styles from '../Content.module.sass';

interface FerramentaResponse {
  id_ferramenta: number;
  descritivo: string;
  icone: string;
  id_categoria: number;
}

interface TagResponse {
  id_tag: number;
  descritivo: string;
}

interface selectOptions {
  value: number;
  label: string;
  selected?: boolean;
}

interface EditorContent {
  level: {
    bookmark: {
      content: string;
    };
  };
}

const resource: React.FC = () => {
  const [tags, setTags] = useState<selectOptions[]>([]);
  const [ferramentas, setFerramentas] = useState<selectOptions[]>([]);
  const [conteudo, setConteudo] = useState<any>('');

  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api.get<TagResponse[]>('/tags?limit=10').then(response => {
      const formattedTags = response.data.map(tag => ({
        value: tag.id_tag,
        label: tag.descritivo,
      }));
      setTags(formattedTags);
    });
  }, []);

  useEffect(() => {
    api.get<FerramentaResponse[]>('/ferramentas?limit=10').then(response => {
      const formattedFerramentas = response.data.map(ferramenta => ({
        value: ferramenta.id_ferramenta,
        label: ferramenta.descritivo,
      }));
      setFerramentas(formattedFerramentas);
    });
  }, []);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      console.log(conteudo.level.bookmark.content);

      const schema = Yup.object().shape({
        titulo: Yup.string()
          .required('Este compo é obrigatório')
          .min(8, 'Este campo deve conter ao minimo 8 caracteres'),
        tags: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        ferramenta: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        descricao: Yup.string()
          .required('Este compo é obrigatório')
          .min(20, 'Este campo deve conter ao minimo 20 caracteres'),
        // imagem: Yup.object().required('A imagem é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append('upload', data.imagem as File);

      const response = await api.post('/uploads', formData);

      data.imagem = response.data.url;
      data.conteudo = conteudo;
      data.tag = [1, 2, 3];
      data.ativo = true;

      await api.post('/conteudos', data);
      toast.success('✅ Recurso cadastrado com sucesso!');

      formRef.current.reset();
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao cadastrar o Recurso!');
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
              <h1>Recurso</h1>
              <Button
                type="button"
                size="large"
                icon={MdSend}
                onClick={() => formRef.current.submitForm()}
              >
                Publicar Recurso
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="titulo"
                label="Titulo"
                placeholder="Ex: Como usar o Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <Select
                name="tags[]"
                label="Tags"
                multiple
                options={tags}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <Select
                name="id_ferramenta"
                label="Ferramenta"
                options={ferramentas}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <Input
                name="descricao"
                label="Descrição"
                placeholder="Ex: Neste recurso vamos ver como user o Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <InputFile
                name="imagem"
                label="Imagem"
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <Editor
                initialValue="<p>Initial content</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image',
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help',
                }}
                onChange={content => setConteudo(content)}
              />
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default resource;

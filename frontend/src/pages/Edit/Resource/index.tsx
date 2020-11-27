/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-multi-str */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdSave } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';

import { displayErrors } from '../../../util/error';
import { uploadFile } from '../../../util/upload';
import api from '../../../services/api';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
// import Switch from '../../../components/Switch';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputFile from '../../../components/InputFile';
import CustomSelect from '../../../components/Select';
// import ReactSelect from '../../../components/ReactSelect';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

interface Params {
  id: string;
}

interface FerramentaResponse {
  id_ferramenta: number;
  descritivo: string;
}

interface selectOptions {
  value: number;
  label: string;
}

interface Content {
  ativo: boolean;
  titulo: string;
  imagem: string;
  id_ferramenta: number;
  descricao: string;
  conteudo: any;
}

interface ContentResponse {
  publicacao: Content;
}

// interface Tag {
//   id_tag: number;
//   descritivo: string;
// }

const resource: React.FC = () => {
  const params = useParams() as Params;
  const [editConteudo, setEditConteudo] = useState<Content>();
  const [ferramentas, setFerramentas] = useState<selectOptions[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<ContentResponse>(`/conteudos/${params.id}?onlyActive=false`),
      api.get<FerramentaResponse[]>('/ferramentas?limit=10000000'),
    ]).then(response => {
      const [contentResponse, toolResponse] = response;
      setEditConteudo(contentResponse.data.publicacao);
      setFerramentas(
        toolResponse.data.map(ferramenta => ({
          value: ferramenta.id_ferramenta,
          label: ferramenta.descritivo,
        })),
      );
    });
  }, [params.id]);

  // eslint-disable-next-line no-console
  console.log('Conteúdo', editConteudo);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef: any = useRef<FormHandles>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      // eslint-disable-next-line no-console
      console.log('Formulário', data);

      if (data.imagem === undefined) {
        data.imagem = editConteudo?.imagem;
      } else {
        data.imagem = await uploadFile(data.imagem as File);
      }

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

      // data.tags = editConteudo?.tag.map(tag => tag.id_tag);
      if (data.conteudo === undefined) {
        data.conteudo = editConteudo?.conteudo;
      } else {
        data.conteudo = editConteudo?.conteudo.level.content;
      }
      data.ativo = editConteudo?.ativo;

      await api.put(`/conteudos/${params.id}`, data);
      toast.success('✅ Recurso editado com sucesso!');

      formRef.current.reset();
      window.location.href = 'http://localhost:3000/admin/resources';
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao editar o Recurso!');
      console.log(err);
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
              <div className={styles.resourcesTitle}>
                <h1 className={styles.title}>Editar recurso</h1>
              </div>
              <Button
                type="button"
                variant="contrast"
                icon={MdSave}
                onClick={() => formRef.current.submitForm()}
              >
                Salvar
              </Button>
            </div>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className={styles.form}
              initialData={editConteudo}
            >
              <Input
                name="titulo"
                label="Titulo"
                placeholder="Ex: Como usar o Visual Studio Code"
                // value={editConteudo?.titulo}
                // onChange={e =>
                //   setEditConteudo({
                //     titulo: e.target.value,
                //     descricao: String(editConteudo?.descricao),
                //     conteudo: String(editConteudo?.conteudo),
                //     id_ferramenta: Number(editConteudo?.id_ferramenta),
                //     imagem: String(editConteudo?.imagem),
                //     ativo: Boolean(editConteudo?.ativo),
                //   })
                // }
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <CustomSelect
                name="ativo"
                label="Status"
                options={[
                  { value: Number(1), label: 'Ativo' },
                  { value: Number(0), label: 'Inativo' },
                ]}
                value={Number(editConteudo?.ativo)}
                onChange={e =>
                  setEditConteudo({
                    titulo: String(editConteudo?.titulo),
                    descricao: String(editConteudo?.descricao),
                    conteudo: String(editConteudo?.conteudo),
                    id_ferramenta: Number(editConteudo?.id_ferramenta),
                    imagem: String(editConteudo?.imagem),
                    ativo: Boolean(e.target.value),
                  })}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <CustomSelect
                name="id_ferramenta"
                label="Ferramenta"
                initialDefaultValue
                options={ferramentas}
                value={Number(editConteudo?.id_ferramenta)}
                onChange={e =>
                  setEditConteudo({
                    titulo: String(editConteudo?.titulo),
                    descricao: String(editConteudo?.descricao),
                    conteudo: String(editConteudo?.conteudo),
                    id_ferramenta: Number(e.target.value),
                    imagem: String(editConteudo?.imagem),
                    ativo: Boolean(editConteudo?.ativo),
                  })
                }
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <InputFile
                name="imagem"
                label="Imagem"
                previewSrc={String(editConteudo?.imagem)}
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              {/* <div className={styles.reactSelect}>
                <label htmlFor="tags">Tags</label>
                <ReactSelect id="tags" name="tags" options={tags} isMulti />
              </div> */}
              <Input
                name="descricao"
                label="Descrição"
                placeholder="Ex: Neste recurso vamos ver como user o Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <div className={styles.editorContainer}>
                <label htmlFor="conteudo" className={styles.label}>
                  Conteúdo
                </label>
                <Editor
                  textareaName="conteudo"
                  initialValue="<h1>Titulo</h1><p>Seu conteúdo vai aqui!</p><h2>Sub-titulo</h2><p>Mais conteúdo aqui!</p>"
                  // value={editConteudo?.publicacao.conteudo}
                  // onChange={e => setConteudo(e.target.value)}
                  value={editConteudo?.conteudo}
                  onChange={e =>
                    setEditConteudo({
                      titulo: String(editConteudo?.titulo),
                      descricao: String(editConteudo?.descricao),
                      conteudo: e,
                      id_ferramenta: Number(editConteudo?.id_ferramenta),
                      imagem: String(editConteudo?.imagem),
                      ativo: Boolean(editConteudo?.ativo),
                    })}
                  init={{
                    height: 500,
                    width: '100%',
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image',
                      'charmap print preview anchor help',
                      'searchreplace visualblocks code',
                      'insertdatetime media table paste wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic image | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help',
                  }}
                />
              </div>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default resource;

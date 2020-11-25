import React from 'react';

// import { Container } from './styles';

const User: React.FC = () => {
  return <div />;
};

export default User;

// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useState, useEffect } from 'react';
// import { Form } from '@unform/web';
// import * as Yup from 'yup';
// import { MdSend } from 'react-icons/md';

// import Menu from '../Menu';

// import Navbar from '../../../components/Navbar';
// import Button from '../../../components/Button';
// import Footer from '../../../components/Footer';

// import styles from '../Content.module.sass';

// const user: React.FC = () => {
//   const [tags, setTags] = useState<selectOptions[]>([]);
//   const [ferramentas, setFerramentas] = useState<selectOptions[]>([]);
//   const [conteudo, setConteudo] = useState<any>('');

//   const formRef: any = useRef<FormHandles>(null);

//   const handleSubmit = async (data: Record<string, unknown>) => {
//     try {
//       // Remove all previous errors
//       formRef.current.setErrors({});

//       console.log(data.tags);

//       console.log(conteudo.level.bookmark.content);

//       const schema = Yup.object().shape({
//         titulo: Yup.string()
//           .required('Este compo é obrigatório')
//           .min(8, 'Este campo deve conter ao minimo 8 caracteres'),
//         tags: Yup.number().moreThan(0, 'Este campo é obrigatório'),
//         ferramenta: Yup.number().moreThan(0, 'Este campo é obrigatório'),
//         descricao: Yup.string()
//           .required('Este compo é obrigatório')
//           .min(20, 'Este campo deve conter ao minimo 20 caracteres'),
//         imagem: Yup.object().required('A imagem é obrigatória'),
//       });

//       await schema.validate(data, {
//         abortEarly: false,
//       });

//       const formData = new FormData();
//       formData.append('upload', data.imagem as File);

//       const response = await api.post('/uploads', formData);

//       data.imagem = response.data.url;
//       data.conteudo = conteudo;
//       data.tag = [1, 2, 3];
//       data.ativo = true;

//       await api.post('/conteudos', data);
//       toast.success('✅ Recurso cadastrado com sucesso!');

//       formRef.current.reset();
//     } catch (err) {
//       displayErrors(err, formRef);
//       toast.error('❌ Erro ao cadastrar o Recurso!');
//     }
//   };

//   return (
//     <>
//       <Navbar logged />
//       <main className={styles.gridHalf}>
//         <Menu />
//         <section className={styles.section}>
//           <div className={styles.container}>
//             <div className={styles.header}>
//               <h1>Usuário</h1>
//               <Button type="button" icon={MdSend}>
//                 Editar Usuário
//               </Button>
//             </div>
//             <Form onSubmit={handleSubmit} />
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default user;

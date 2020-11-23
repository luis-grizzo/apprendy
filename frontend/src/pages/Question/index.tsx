import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowDownward, MdArrowUpward, MdSend } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import CardPanel from '../../components/CardPanel';
import Input from '../../components/Input';
import Footer from '../../components/Footer';

import styles from './Question.module.sass';

import contentImage from '../../assets/noUserImage.jpg';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';

const Question: React.FC = () => {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.header}>
              <h1 className={styles.title}>Função assincrona não funciona</h1>
              <div className={styles.infos}>
                <span className={styles.info}>Questão de Joana Da Silva</span>
                <span className={styles.info}>Publicado em 01/01/2020</span>
                <span className={`${styles.status} ${styles.done}`}>
                  Respondida
                </span>
              </div>
            </article>
            <article className={styles.content}>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aperiam officiis repellat nisi nulla explicabo? Voluptatum
                blanditiis veniam quos repellat, rerum ad libero vero
                praesentium ratione, incidunt laboriosam dolorem ab perferendis.
                Nemo inventore nulla veniam voluptas. Nulla voluptas error
                praesentium, minus, eaque sunt illum deserunt alias nobis, fuga
                incidunt rem illo omnis ipsa eum. Porro, illum. Porro libero
                similique iusto omnis. Nesciunt, voluptatem excepturi. Ut
                eligendi praesentium unde sapiente fugit voluptatibus impedit
                animi placeat deleniti voluptatum esse necessitatibus fugiat
                ipsum labore nesciunt, distinctio possimus commodi laudantium
                repellendus rerum maiores laborum. Cum. Necessitatibus
                doloremque aliquam ipsum assumenda dolores fugiat velit
                quibusdam, aspernatur officiis nisi error iste laudantium
                adipisci iusto itaque veritatis recusandae? Iste modi illum enim
                aspernatur amet error ratione asperiores necessitatibus.
                Blanditiis, in corrupti eligendi hic excepturi mollitia ratione
                maxime, delectus architecto voluptates nesciunt ipsa repellendus
                consequuntur enim. Aspernatur, hic voluptate repellat expedita
                deserunt perferendis tenetur quisquam temporibus laborum, minus
                iste?
              </p>
              <div className={styles.code}>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  suscipit est corrupti impedit, pariatur architecto nihil.
                  Mollitia quod sit illum repellendus a eveniet rem impedit
                  soluta nobis dicta! Illum, inventore!
                </p>
              </div>
              <p className={styles.text}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis ab dolor nam nobis ea deserunt quod optio? Assumenda,
                harum? Debitis corrupti fugiat accusamus vel sint eius minima ut
                nulla molestiae?Repellendus, consequatur! Voluptatibus quo
                recusandae eveniet dolore quisquam obcaecati cumque reiciendis
                dignissimos totam, enim accusantium veniam repellat, cum minus.
                Excepturi incidunt asperiores quisquam aspernatur quas iusto,
                libero labore pariatur fuga.
              </p>
            </article>
            <CardPanel
              image={contentImage}
              imageAlt="Name"
              className={`${styles.commentCard} ${styles.bestAnswer}`}
            >
              <div className={styles.cardContent}>
                <div className={styles.infos}>
                  <Link to="/user/123">
                    <h3 className={styles.name}>Roberta Souza</h3>
                  </Link>
                  <span className={styles.info}>Em 01 Jan, 2020</span>
                  <span className={styles.votes}>
                    <Button icon={MdArrowUpward} className={styles.upVote} />
                    <span className={styles.number}>0</span>
                    <Button
                      icon={MdArrowDownward}
                      className={styles.downVote}
                    />
                  </span>
                </div>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  soluta sunt ullam adipisci beatae deserunt explicabo nobis
                  delectus, ab nulla enim, accusantium debitis culpa totam vero
                  doloribus magni esse! Facilis!
                </p>
              </div>
            </CardPanel>
            <CardPanel
              className={styles.commentCard}
              image={contentImage}
              imageAlt="name"
            >
              <Form onSubmit={handleSubmit} className={styles.commentForm}>
                <Textarea
                  name="comentario"
                  label="Comentário"
                  placeholder="Seu comentário..."
                  containerClass={styles.textareaContainer}
                />
                <Button type="submit" icon={MdSend}>
                  Adicionar comentário
                </Button>
              </Form>
            </CardPanel>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Question;

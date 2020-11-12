import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { MdToday, MdFavorite, MdSend } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CardPanel from '../../components/CardPanel';
import Footer from '../../components/Footer';

import styles from './Post.module.sass';

import backgroundImage from '../../assets/testImage.jpg';
import authorImage from '../../assets/user.jpg';
import commentImage from '../../assets/testImage1.jpg';

const Post: React.FC = () => {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <>
      <Navbar logged />
      <header>
        <Parallax
          className={styles.parallax}
          contentClassName={styles.container}
          bgImage={backgroundImage}
          strength={500}
        >
          <h1 className={styles.title}>Arrow functions do Javascript</h1>
        </Parallax>
      </header>
      <main className="container">
        <section className="section">
          <CardPanel
            className={styles.postCard}
            image={authorImage}
            imageAlt="name"
          >
            <div className={styles.authorInfos}>
              <Link to="/user/123">
                <h2 className={styles.name}>Joana Da Silva</h2>
              </Link>
              <div className={styles.postInfos}>
                <span className={styles.date}>
                  <MdToday className={styles.icon} />
                  01 Jan, 2020
                </span>
                <span className="dot" />
                <span className={styles.likes}>
                  <MdFavorite className={styles.icon} />
                  216
                </span>
              </div>
            </div>
            <div className={styles.related}>
              <h3 className={styles.description}>Tags relacionadas</h3>
              <div className={styles.tagsWrapper}>
                <Link className={styles.tag} to="/search/123">
                  Programação
                </Link>
                <Link className={styles.tag} to="/search/123">
                  Javascript
                </Link>
                <Link className={styles.tag} to="/search/123">
                  Java
                </Link>
                <Link className={styles.tag} to="/search/123">
                  Javascripto
                </Link>
                <Link className={styles.tag} to="/search/123">
                  Python
                </Link>
                <Link className={styles.tag} to="/search/123">
                  Celular
                </Link>
              </div>
            </div>
            <Button
              icon={MdFavorite}
              iconClass={styles.icon}
              className={styles.button}
            />
          </CardPanel>
        </section>
        <section className={`section ${styles.content}`}>
          <h3 className={styles.title}>Introdução as arrow functions</h3>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            tempore, quos explicabo nihil assumenda provident facere obcaecati
            vitae beatae aspernatur blanditiis magnam totam, quas fuga
            reiciendis tempora molestias maxime architecto. Dolore excepturi,
            velit modi unde ab inventore aliquam blanditiis porro odio harum,
            illum optio reiciendis ipsa fuga iusto possimus repellendus labore
            esse eveniet. Voluptatum deserunt nam nisi ullam numquam
            necessitatibus. Amet eaque assumenda non velit architecto provident
            repellendus atque quasi explicabo possimus iusto voluptates sint
            natus, odit in, odio sed! Aut distinctio autem debitis
            exercitationem aspernatur nesciunt dolores natus repellendus? Optio
            delectus sit totam consequatur explicabo accusamus harum a labore
            amet est. Quod quos, doloremque alias dicta placeat nulla tenetur
            aperiam modi rerum provident dolor incidunt quaerat perferendis
            ullam mollitia! Deleniti, inventore. Necessitatibus dolor illum
            optio, perferendis ipsum assumenda, unde veniam dignissimos aliquid
            doloremque maxime vel facere alias exercitationem. Ab accusantium
            debitis quod corporis ratione cupiditate labore magni quaerat
            impedit?
          </p>
          <img src={backgroundImage} alt="sky" className={styles.img} />
          <h3 className={styles.title}>Conclusão</h3>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam qui
            iusto id, ad error laudantium quasi, facere molestiae quibusdam
            reiciendis sit eos velit eligendi cumque sapiente hic neque iste.
            Enim! Reprehenderit accusamus reiciendis dolorum non iure officiis
            aut consequatur qui doloribus est, laboriosam nesciunt ea ad ut,
            commodi animi inventore vero quaerat modi quos nihil. Animi
            similique voluptatibus dicta quos. Ullam assumenda nostrum doloribus
            architecto quaerat magnam reiciendis ab earum. Nostrum porro
            voluptates exercitationem, sed nulla accusantium reiciendis neque
            deserunt, sit culpa quidem repellendus maxime, mollitia error quia
            ullam rerum! Recusandae voluptas beatae quia aliquid unde magni
            quasi et omnis, deleniti, vero pariatur corporis minima repellat
            sint doloremque. Laborum nesciunt obcaecati dolorum magni officia,
            repudiandae iste unde nihil provident neque? Tempore harum iure et
            dolores minima hic dolore, eius explicabo, atque consequatur odio ad
            similique, voluptatibus deleniti consectetur dolorum quod quas
            corporis fuga itaque consequuntur molestias laudantium rem autem!
            Ipsum.
          </p>
        </section>
        <section className="section">
          <CardPanel
            className={styles.commentCard}
            image={commentImage}
            imageAlt="name"
          >
            <div className={styles.content}>
              <div className={styles.infos}>
                <Link to="/user/123">
                  <h3 className={styles.name}>Roberta Souza</h3>
                </Link>
                <span className="dot" />
                <span className={styles.date}>Em 01 Jan, 2020</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                soluta sunt ullam adipisci beatae deserunt explicabo nobis
                delectus, ab nulla enim, accusantium debitis culpa totam vero
                doloribus magni esse! Facilis!
              </p>
            </div>
          </CardPanel>
          <CardPanel
            className={styles.commentCard}
            image={authorImage}
            imageAlt="name"
          >
            <Form onSubmit={handleSubmit} className={styles.commentForm}>
              <Input
                name="comentario"
                label="Deixe um comentário"
                placeholder="Sua mensagem..."
                containerClass={styles.inputContainer}
                button
                buttonClass={styles.button}
                buttonIcon={MdSend}
                className={styles.input}
              />
            </Form>
          </CardPanel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Post;

import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import { MdEdit, MdDateRange, MdFavorite, MdBook } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import CardPanel from '../../components/CardPanel';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './User.module.sass';

import userImage from '../../assets/user.jpg';
import testImage from '../../assets/testImage.jpg';

const User: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log('User page', modalOpen);

  const handleModal = () => {
    setModalOpen(!modalOpen);
    console.log('Novo valor - user page', modalOpen);
  };

  const handleUserUpdate = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <>
      <Modal open={modalOpen} title="Alterar dados da conta">
        <Form onSubmit={handleUserUpdate}>
          <p>banana</p>
        </Form>
      </Modal>
      <Navbar logged />
      <Parallax
        className={styles.parallax}
        bgImage={testImage}
        strength={500}
        contentClassName={styles.parallaxContent}
      />
      <main>
        <section className="section containerFluid">
          <CardPanel className={`${styles.userInfo}`}>
            <div className={styles.top}>
              <div className={styles.imageWrapper}>
                <img src={userImage} alt="Name" className={styles.img} />
              </div>
              <Button
                type="button"
                icon={MdEdit}
                variant="outline"
                className={styles.button}
                onClick={handleModal}
              >
                Editar perfil
              </Button>
            </div>
            <div className={styles.description}>
              <h1 className={styles.name}>Joana Da Silva</h1>
              <div className={styles.details}>
                <MdDateRange className={styles.icon} />
                Entrou em Jan 2020
                <span className={styles.dot} />
                <MdBook className={styles.icon} />
                216 Recursos
                <span className={styles.dot} />
                <MdFavorite className={styles.icon} />
                30 Favoritos
              </div>
              <p className={styles.bio}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                laborum incidunt laboriosam. Quis eligendi quia ut, voluptatum
                dolorem soluta suscipit. Quod perspiciatis aperiam optio
                distinctio maxime, ad corporis error enim.
              </p>
            </div>
          </CardPanel>
        </section>
        <section className="section container">
          <h2 className={styles.title}>Favoritos de Joana Da Silva</h2>
          <div className="gridAuto">
            {/* <Card
              postId={123}
              image={testImage}
              title="Entendendo Baskara"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Matemática', 'Lógica', 'Calculo']}
              imageBg
            />
            <Card
              postId={123}
              image={testImage}
              title="Titulo"
              date="01 Jan, 2020"
              description="Descrição"
              tags={['um', 'dois', 'tres']}
              imageBg
            />
            <Card
              postId={123}
              image={testImage}
              title="Titulo"
              date="01 Jan, 2020"
              description="Descrição"
              tags={['um', 'dois', 'tres']}
              imageBg
            /> */}
          </div>
        </section>
        <section className="section container">
          <h2 className={styles.title}>Recursos de Joana Da Silva</h2>
          <div className="gridAuto">
            {/* <Card
              postId={123}
              image={testImage}
              title="Entendendo Baskara"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Matemática', 'Lógica', 'Calculo']}
              imageBg
            />
            <Card
              postId={123}
              image={testImage}
              title="Titulo"
              date="01 Jan, 2020"
              description="Descrição"
              tags={['um', 'dois', 'tres']}
              imageBg
            />
            <Card
              postId={123}
              image={testImage}
              title="Titulo"
              date="01 Jan, 2020"
              description="Descrição"
              tags={['um', 'dois', 'tres']}
              imageBg
            /> */}
          </div>
          <Pagination pageCount={30} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;

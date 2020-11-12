import React from 'react';

import Navbar from '../../components/Navbar';
import Switch from '../../components/Switch';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import styles from './Search.module.sass';
import testImage from '../../assets/testImage.jpg';
import heroHome from '../../assets/heroHome.jpg';

const Search: React.FC = () => {
  return (
    <>
      <Navbar logged admin />
      <main className={`${styles.gridHalf} ${styles.searchGrid}`}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.container}>
            <div className={styles.filterGroup}>
              <h2 className={styles.title}>Tags</h2>
              <Switch label="Programação" isChecked />
              <Switch label="Português" />
              <Switch label="Matemática" />
              <Switch label="Fisica" />
              <Switch label="Biologia" />
              <Switch label="Quimicia" />
            </div>
          </div>
        </aside>
        <section className={`${styles.section} ${styles.container}`}>
          <div className={`${styles.gridAuto} ${styles.cardsGrid}`}>
            {/* <Card
              postId={123}
              image={heroHome}
              title="Entendendo Baskara"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Matemática', 'Lógica', 'Calculo']}
              imageBg
            />
            <Card
              postId={456}
              image={testImage}
              title="Programando em Python"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Programação', 'Python']}
              imageBg
            />
            <Card
              postId={789}
              image={heroHome}
              title="Os muitos usos dos quatro porques"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Lingua portuguesa', 'Gramática']}
              imageBg
            />
            <Card
              postId={147}
              image={testImage}
              title="Fauna e Flora"
              date="12 Mai, 2019"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Biologia']}
              imageBg
            />
            <Card
              postId={123}
              image={heroHome}
              title="Entendendo Baskara"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Matemática', 'Lógica', 'Calculo']}
              imageBg
            />
            <Card
              postId={456}
              image={testImage}
              title="Programando em Python"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Programação', 'Python']}
              imageBg
            />
            <Card
              postId={789}
              image={heroHome}
              title="Os muitos usos dos quatro porques"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Lingua portuguesa', 'Gramática']}
              imageBg
            />
            <Card
              postId={147}
              image={testImage}
              title="Fauna e Flora"
              date="12 Mai, 2019"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Biologia']}
              imageBg
            />
            <Card
              postId={123}
              image={heroHome}
              title="Entendendo Baskara"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Matemática', 'Lógica', 'Calculo']}
              imageBg
            />
            <Card
              postId={456}
              image={testImage}
              title="Programando em Python"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Programação', 'Python']}
              imageBg
            />
            <Card
              postId={789}
              image={heroHome}
              title="Os muitos usos dos quatro porques"
              date="01 Jan, 2020"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Lingua portuguesa', 'Gramática']}
              imageBg
            />
            <Card
              postId={147}
              image={testImage}
              title="Fauna e Flora"
              date="12 Mai, 2019"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vulputate nisl, et volutpat metus..."
              tags={['Biologia']}
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

export default Search;

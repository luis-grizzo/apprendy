/* eslint-disable camelcase */
import React from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Card from '../Card';

import styles from './Carrousel.module.sass';

interface CarousselProps {
  carousselProviderClass?: string;
  sliderClass?: string;
  slideClass?: string;
  contents: Array<ContentProps>;
}

interface ContentProps {
  publicacao: {
    id_conteudo: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

const Caroussel: React.FC<CarousselProps> = ({
  carousselProviderClass,
  sliderClass,
  slideClass,
  contents,
}) => {
  return (
    <CarouselProvider
      naturalSlideWidth={10}
      naturalSlideHeight={10}
      totalSlides={contents.length}
      visibleSlides={4}
      isIntrinsicHeight
      isPlaying
      infinite
      className={`${styles.carousselProvider} ${carousselProviderClass}`}
    >
      <Slider className={`${styles.slider} ${sliderClass}`}>
        {contents.map(content => (
          <Slide
            key={content.publicacao.id_conteudo}
            index={contents.length}
            className={`${styles.slide} ${slideClass}`}
          >
            <Card
              postId={content.publicacao.id_conteudo}
              image={content.publicacao.imagem}
              title={content.publicacao.titulo}
              date={content.publicacao.data_publicacao}
              description={content.publicacao.descricao}
              // tags={content.tag}
              imageBg
            />
          </Slide>
        ))}
        {/* <Slide index={0} className={styles.slide}>
          I am the first Slide.
        </Slide>
        <Slide index={1} className={styles.slide}>
          I am the second Slide.
        </Slide>
        <Slide index={2} className={styles.slide}>
          I am the third Slide.
        </Slide> */}
      </Slider>
      <div className={styles.footer}>
        <DotGroup />
      </div>
      <ButtonBack className={styles.backButton}>
        <MdKeyboardArrowLeft className={styles.icon} />
      </ButtonBack>
      <ButtonNext className={styles.nextButton}>
        <MdKeyboardArrowRight className={styles.icon} />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Caroussel;

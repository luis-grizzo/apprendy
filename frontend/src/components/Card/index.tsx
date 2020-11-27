/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';

import styles from './Card.module.sass';

interface ICardProps {
  postId: number;
  image: string;
  title: string;
  date: string;
  description: string;
  // tags: Array<{
  //   id_tag: number;
  //   descritivo: string;
  // }>;
  imageBg?: boolean;
}

const Card: React.FC<ICardProps> = ({
  postId,
  image,
  title,
  date,
  description,
  // tags,
  imageBg,
}) => {
  return (
    <article className={`${styles.card} ${imageBg && styles.cardImageBg}`}>
      <Link to={`/post/${postId}`}>
        {imageBg ? (
          <div className={styles.cardImage}>
            <img src={image} alt={title} />
            <div className={styles.tagsContainer}>
              {/* {tags.map(tag => (
                <span key={tag.id_tag} className={styles.tag}>
                  {tag.descritivo}
                </span>
              ))} */}
            </div>
            <div className={styles.cardContent}>
              <span className={styles.date}>
                <MdDateRange className={styles.icon} />
                {date}
              </span>
              <h2 className={`h3 ${styles.title}`}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.cardImage}>
              <img src={image} alt={title} />
              <div className={styles.tagsContainer}>
                {/* {tags.map(tag => (
                  <span key={tag.id_tag} className={styles.tag}>
                    {tag.descritivo}
                  </span>
                ))} */}
              </div>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.date}>
                <MdDateRange className={styles.icon} />
                {date}
              </span>
              <h2 className={`h3 ${styles.title}`}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
          </>
        )}
      </Link>
    </article>
  );
};

export default Card;

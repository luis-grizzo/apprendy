import React from 'react';

import styles from './CardPanel.module.sass';

interface ICardPanelProps {
  image?: string;
  imageAlt?: string;
  className?: string;
}

const CardPanel: React.FC<ICardPanelProps> = ({
  image,
  imageAlt,
  className,
  children,
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {image && (
        <div className={styles.imgWrapper}>
          <img className={styles.userImg} src={image} alt={imageAlt} />
        </div>
      )}
      {children}
    </div>
  );
};

export default CardPanel;

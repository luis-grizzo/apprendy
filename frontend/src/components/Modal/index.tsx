import React, { useState, useEffect } from 'react';

import styles from './Modal.module.sass';

interface ModalProps {
  open?: boolean;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ open, title, className, children }) => {
  const [modalOpen, setModalOpen] = useState(open);
  console.log('Modal page - Prop', open);
  console.log('Modal page - State', modalOpen);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <article
        className={`${styles.modal} ${className} ${
          modalOpen ? styles.open : ''
        }`}
      >
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.container}>{children}</div>
      </article>
      <div
        className={`${styles.overlay} ${modalOpen ? styles.active : ''}`}
        role="button"
        aria-label="Fechar modal"
        tabIndex={0}
        onClick={closeModal}
        onKeyUp={closeModal}
      />
    </>
  );
};

export default Modal;

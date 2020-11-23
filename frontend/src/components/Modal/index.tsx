import React, { useState, useEffect } from 'react';

import styles from './Modal.module.sass';

interface ModalProps {
  open?: boolean;
  title?: string;
  headerContent?: any;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  headerContent,
  className,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(open);

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
        <div className={styles.modalHeader}>
          <h1 className={styles.title}>{title}</h1>
          {headerContent}
        </div>
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

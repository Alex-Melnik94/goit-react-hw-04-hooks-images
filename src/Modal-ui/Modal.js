import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ openModal, modalImg }) {
  useEffect(() => {
    window.addEventListener('keydown', onEscCloseModal);
    return function cleanup() {
      window.removeEventListener('keydown', onEscCloseModal);
    };
  });

  const onEscCloseModal = e => {
    if (e.code === 'Escape') {
      openModal();
    }
  };

  const onCloseModal = e => {
    if (e.currentTarget === e.target) {
      openModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={onCloseModal}>
      <div className={styles.Modal}>
        <img src={modalImg.largeImageURL} alt={modalImg.tags} />
      </div>
    </div>,
    modalRoot,
  );
}

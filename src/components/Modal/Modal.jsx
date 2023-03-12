import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, setIsModalOpen }) => {
  const closeOnEscape = event => {
    if (event.code === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const closeOnClick = event => {
    if (event.target.className === css.overlay) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('click', closeOnClick);
  });

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;

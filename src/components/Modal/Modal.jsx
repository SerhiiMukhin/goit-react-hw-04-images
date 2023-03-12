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

// export default class Modal extends React.Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeOnEscape);
//     document.addEventListener('click', this.closeOnClick);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeOnEscape);
//     document.removeEventListener('click', this.closeOnClick);
//   }

//   closeOnEscape = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   closeOnClick = event => {
//     if (event.target.className === css.overlay) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return (
//       <div className={css.overlay}>
//         <div className={css.modal}>
//           <img src={modalProps.src} alt={modalProps.alt} />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;

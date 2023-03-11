import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, title, onClick }) => (
  <li className={css.item}>
    <img
      loading="lazy"
      className={css.item_image}
      src={url}
      alt={title}
      onClick={onClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

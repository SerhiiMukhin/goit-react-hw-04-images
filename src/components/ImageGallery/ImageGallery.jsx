import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ result }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState(
    'https://c1.cprnt.com/storage/i/5b/4b/2c/14/eac64291ab3e94f725ae387c/37eea85e959254fcd2ed00f3e589fc7f.png'
  );
  const [modalImgAlt, setModalImgAlt] = useState(
    'Доброго вечора, ми з України!'
  );

  const onClick = event => {
    setIsModalOpen(true);
    setModalImgSrc(event.currentTarget.src);
    setModalImgAlt(event.currentTarget.alt);
  };

  return (
    <div>
      <ul className={css.gallery}>
        {result.map(({ largeImageURL, tags, id }) => (
          <ImageGalleryItem
            url={largeImageURL}
            title={tags}
            key={id}
            onClick={onClick}
          ></ImageGalleryItem>
        ))}
      </ul>
      {isModalOpen && <Modal src={modalImgSrc} alt={modalImgAlt} setIsModalOpen={setIsModalOpen}></Modal>}
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  result: PropTypes.array.isRequired,
};

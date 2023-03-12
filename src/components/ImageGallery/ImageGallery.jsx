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

// export default class ImageGallery extends React.Component {
//   state = {
//     results: [],
//     page: 1,
//     status: 'idle',
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchQuery !== this.props.searchQuery) {
//       this.setState({ status: 'pending', page: 1 });
//       fetchImages(this.props.searchQuery, 1)
//         .then(response => {
//           if (response.data.total === 0) {
//             return this.setState({ status: 'rejected' });
//           }
//           this.setState({
//             status: 'resolved',
//             results: response.data.hits,
//             page: this.state.page + 1,
//           });
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   onLoadMore = () => {
//     this.setState({ status: 'pending' });
//     fetchImages(this.props.searchQuery, this.state.page)
//       .then(response => {
//         if (response.data.total === 0) {
//           return this.setState({ status: 'rejected' });
//         } else {
//           this.setState(prevState => {
//             return {
//               status: 'resolved',
//               results: [...prevState.results, ...response.data.hits],
//               page: this.state.page + 1,
//             };
//           });
//         }
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   };

//   onClick = event => {
//     this.setState({ isModalOpen: true });
//     const modalProps = {
//       src: event.currentTarget.src,
//       alt: event.currentTarget.alt,
//       isModalOpen: true,
//     };
//     this.props.getModal(modalProps);
//   };

//   render() {
//     if (this.state.status === 'idle') {
//       return <div className={css.message}>Search pictures by name!</div>;
//     }

//     if (this.state.status === 'pending') {
//       return <Loader></Loader>;
//     }

//     if (this.state.status === 'resolved') {
//       return (
//         <div>
//           <ul className={css.gallery}>
//             {this.state.results.map(({ largeImageURL, tags, id }) => (
//               <ImageGalleryItem
//                 url={largeImageURL}
//                 title={tags}
//                 key={id}
//                 onClick={this.onClick}
//               ></ImageGalleryItem>
//             ))}
//           </ul>
//           <Button onClick={this.onLoadMore}></Button>
//         </div>
//       );
//     }

//     if (this.state.status === 'rejected') {
//       return <div className={css.message}>Ooops, something went wrong... Please, try again</div>;
//     }
//   }
// }

ImageGallery.propTypes = {
  result: PropTypes.array.isRequired,
};

import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export default class App extends React.Component {
  state = {
    searchQuery: '',
    isModalOpen: false,
    modalImgSrc:
      'https://c1.cprnt.com/storage/i/5b/4b/2c/14/eac64291ab3e94f725ae387c/37eea85e959254fcd2ed00f3e589fc7f.png',
    modalImgAlt: 'Доброго вечора, ми з України!',
  };

  getSearchQuery = searchQuery => {
    this.setState({ searchQuery });
  };

  getModalProps = modalProps => {
    this.setState({
      modalImgSrc: modalProps.src,
      modalImgAlt: modalProps.alt,
      isModalOpen: modalProps.isModalOpen,
    });
  };

  closeModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    return (
      <div>
        <Searchbar getSearchQuery={this.getSearchQuery}></Searchbar>
        <ImageGallery
          searchQuery={this.state.searchQuery}
          getModal={this.getModalProps}
        ></ImageGallery>
        {this.state.isModalOpen === true && (
          <Modal
            src={this.state.modalImgSrc}
            alt={this.state.modalImgAlt}
            closeModal={this.closeModal}
          ></Modal>
        )}
      </div>
    );
  }
}

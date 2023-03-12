import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetchImages';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (searchQuery === '') return;

    setStatus('pending');
    setShowLoadMoreButton(false);

    fetchImages(searchQuery, page)
      .then(response => {
        setResult(prevResult => [...prevResult, ...response.data.hits]);
        setStatus('resolved');
        setTotal(response.total);
        setShowLoadMoreButton(true);
      })
      .catch(error => {
        setStatus('rejected');
        console.log(error);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    if (status !== 'resolved') return;

    if (result.length === 0) {
      setStatus('rejected');
      setShowLoadMoreButton(false);
      return;
    }

    if (total <= result.length) {
      setShowLoadMoreButton(false);
      alert("Sorry, there's nothing more to show");
    }
  }, [status, page, result, total]);

  function loadMore() {
    setPage(page => page + 1);
  }

  return (
    <div>
      <Searchbar setSearchQuery={setSearchQuery} searchQuery></Searchbar>
      {status === 'pending' ? (
        <Loader></Loader>
      ) : (
        <ImageGallery result={result}></ImageGallery>
      )}
      {showLoadMoreButton === true && <Button onClick={loadMore}></Button>}
    </div>
  );
};

export default App;

// export default class App extends React.Component {
//   state = {
//     searchQuery: '',
//     isModalOpen: false,
//     modalImgSrc:
//       'https://c1.cprnt.com/storage/i/5b/4b/2c/14/eac64291ab3e94f725ae387c/37eea85e959254fcd2ed00f3e589fc7f.png',
//     modalImgAlt: 'Доброго вечора, ми з України!',
//   };

//   getSearchQuery = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   getModalProps = modalProps => {
//     this.setState({
//       modalImgSrc: modalProps.src,
//       modalImgAlt: modalProps.alt,
//       isModalOpen: modalProps.isModalOpen,
//     });
//   };

//   closeModal = () => {
//     this.setState(({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <Searchbar getSearchQuery={this.getSearchQuery}></Searchbar>
//         <ImageGallery
//           searchQuery={this.state.searchQuery}
//           getModal={this.getModalProps}
//         ></ImageGallery>
//         {this.state.isModalOpen === true && (
//           <Modal
//             src={this.state.modalImgSrc}
//             alt={this.state.modalImgAlt}
//             closeModal={this.closeModal}
//           ></Modal>
//         )}
//       </div>
//     );
//   }
// }

import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetchImages';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

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
        console.log(searchQuery);
        console.log(response.data);
        setResult(prevResult => [...prevResult, ...response.data.hits]);
        setTotal(response.data.total);
        if (response.data.total === 0) {
          setStatus('rejected');
        } else {
          setStatus('resolved');
          setShowLoadMoreButton(true);
        }
      })
      .catch(error => {
        setStatus('rejected');
        console.log(error);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    if (status !== 'resolved') return;

    if (result.length === total) {
      setShowLoadMoreButton(false);
    }
  }, [status, result, total]);

  function loadMore() {
    setPage(page => page + 1);
  }

  return (
    <div>
      <Searchbar
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setPage={setPage}
        setShowLoadMoreButton={setShowLoadMoreButton}
        setResult={setResult}
      ></Searchbar>
      {status === 'pending' ? (
        <Loader></Loader>
      ) : (
        <ImageGallery result={result}></ImageGallery>
      )}
      {status === 'rejected' && (
        <div className={css.message}>
          Ooops, something went wrong... Please, try again
        </div>
      )}
      {showLoadMoreButton === true && <Button onClick={loadMore}></Button>}
    </div>
  );
};

export default App;

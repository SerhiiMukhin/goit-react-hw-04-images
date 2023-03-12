import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Searchbar = ({
  searchQuery,
  setSearchQuery,
  setPage,
  setShowLoadMoreButton,
  setResult,
}) => {
  const onSubmit = event => {
    event.preventDefault();

    const newQuery = event.target.query.value.trim();

    if (newQuery === '') {
      alert('Please enter your request');
      return;
    }

    if (searchQuery !== newQuery && newQuery !== '') {
      setSearchQuery(newQuery);
      setPage(1);
      setResult([]);
    }
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <BiSearch className={css.icon}></BiSearch>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

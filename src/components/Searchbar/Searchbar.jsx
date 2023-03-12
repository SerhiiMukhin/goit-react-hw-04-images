import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  const onSubmit = event => {
    event.preventDefault();

    const query = event.currentTarget.query.value;

    if (query.trim() === '') {
      alert('Please, enter something in the search field');
      return;
    }

    setSearchQuery(query);
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

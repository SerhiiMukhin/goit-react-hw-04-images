import React from 'react';
import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      alert('Please, enter something in the search field');
      return;
    }

    const query = event.currentTarget.query.value;
    this.setState({ searchQuery: query.toLowerCase() });
    this.props.getSearchQuery(this.state.searchQuery);
  };

  onChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmit}>
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
            value={this.state.searchQuery}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import 'index.css';

export const SearchBar = ({ setQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handelChange = e => {
    setSearchQuery(e.target.value.trim());
  };

  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('😭😭😭😭', {
        duration: 1000,
        position: 'top-right',
      });
      return;
    }
    setQuery(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
          <FiSearch className="SearchIcon" />
        </button>

        <input
          onChange={handelChange}
          value={searchQuery}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  setQuery: PropTypes.func,
};

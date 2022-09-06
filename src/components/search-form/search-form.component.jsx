import './search-form.styles.scss';

const SearchForm = ({ toggleIsSearchHidden, handleChange, handleSearchSubmit, last_searched }) => {
  return (
    <div className='search-form-container'>
      <span className='close-search-form' onClick={toggleIsSearchHidden}>
        X
      </span>
      <div className='search-form'>
        <input
          type='search'
          className='search-form-input'
          placeholder='search location'
          onChange={handleChange}
        />
        <button
          type='button'
          className='search-form-button'
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </div>
      <div className='last-searched'>
        {last_searched &&
          last_searched.map((location, index) => (
            <span key={index} className='last-searched-location' onClick={(e) => handleSearchSubmit(e, location)}>
              {location}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SearchForm;

import { useState, useContext, Fragment } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';
import SearchForm from '../search-form/search-form.component';

import { getDate } from '../../utils/date.utils';
import {
  getCoordinates,
  getCurrentPosition,
  getLocationName,
} from '../../utils/location.utils';

import './today-panel.syles.scss';

const TodayPanel = ({ location_name, setLocationName }) => {
  const [new_location_name, setNewLocationName] = useState('');
  const {
    setNewLocation,
    forecast,
    units,
    last_searched,
    is_search_hidden,
    toggleIsSearchHidden,
    addToLastSearched,
  } = useContext(ForecastContext);
  const current_date = forecast && getDate(forecast.current.dt);

  const handleChange = (event) => {
    setNewLocationName(event.target.value);
  };

  const handleSearchSubmit = async (event, location = null) => {
    event.preventDefault();
    const search_location = location || new_location_name;

    if (!search_location) {
      alert('Please enter a location name!');
      return;
    }

    const coords = await getCoordinates(search_location);
    setLocationName(coords.name);
    setNewLocation(coords);
    setNewLocationName('');
    toggleIsSearchHidden();
    addToLastSearched(coords.name);
  };

  const handleGetCurrentPosition = () => {
    getCurrentPosition(async (position) => {
      setNewLocation(position.coords);

      const { name } = await getLocationName(position.coords);
      setLocationName(name);
    });
  };

  return (
    <div className='today-panel-container'>
      {is_search_hidden ? (
        <Fragment>
          <div className='location-buttons'>
            <button
              type='button'
              className='search-for-places'
              onClick={toggleIsSearchHidden}
            >
              Search For Places
            </button>
            <button
              type='button'
              className='get-current-location'
              onClick={handleGetCurrentPosition}
            >
              <span className='material-symbols-outlined'>my_location</span>
            </button>
          </div>
          <img
            className='current-weather-image'
            src=''
            alt='current-weather-image'
          />
          <span className='current-temperature'>
            {Math.floor(forecast.current.temp)}
            <span>{units.temp.toUpperCase()}</span>
          </span>
          <span className='current-temperature-description'>
            {forecast.current.weather[0].description}
          </span>
          <span className='current-date'>
            {' '}
            Today •{' '}
            {`${current_date.day}, ${current_date.date} ${current_date.month}`}
          </span>
          <div className='current-location'>
            <span className='material-symbols-outlined location-icon'>
              location_on
            </span>
            {location_name}
          </div>
        </Fragment>
      ) : (
        <SearchForm
          toggleIsSearchHidden={toggleIsSearchHidden}
          handleChange={handleChange}
          handleSearchSubmit={handleSearchSubmit}
          last_searched={last_searched}
        />
      )}
    </div>
  );
};

export default TodayPanel;

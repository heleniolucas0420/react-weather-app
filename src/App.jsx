import { Fragment, useState, useEffect, useContext } from 'react';

import { ForecastContext } from './contexts/forecast.context';

import { getLocationName, getCoordinates, getCurrentPosition } from './utils/location.utils';
import { getDate } from './utils/date.utils';

import './App.css';

const App = () => {
  const [location_name, setLocationName] = useState('');
  const [new_location_name, setNewLocationName] = useState('');
  const [is_search_hidden, setIsSearchHidden] = useState(true);
  const { setNewLocation, forecast, units, setNewUnits } = useContext(ForecastContext);
  
  useEffect(() => {
    getCurrentPosition(async (position) => {
      setNewLocation(position.coords);

      const { name } = await getLocationName(position.coords);
      setLocationName(name);
    });
  }, []);

  const handleToggleIsSearchHidden = () => {
    setIsSearchHidden(!is_search_hidden);
  }

  const handleChange = (event) => {
    setNewLocationName(event.target.value);
  }

  const handleSearchSubmit = async () => {
    const coords = await getCoordinates(new_location_name);
    setLocationName(coords.name);
    setNewLocation(coords);
  }

  const handleGetCurrentPosition = () => {
    getCurrentPosition(async (position) => {
      setNewLocation(position.coords);

      const { name } = await getLocationName(position.coords);
      setLocationName(name);
    });
  }

  const current_date = forecast && getDate(forecast.current.dt);

  return (
    <div className='App'>
      {
        forecast ? (
          <Fragment>
            <div className='today-panel-container'>
              {
                is_search_hidden ? (
                  <div className='location-buttons'>
                    <button 
                      type='button' 
                      className='search-for-places' 
                      onClick={handleToggleIsSearchHidden}
                    >
                        Search For Places
                    </button>
                    <button 
                      type='button' 
                      className='get-current-location'
                      onClick={handleGetCurrentPosition}
                    >
                      Get Current Location Forecast
                    </button>
                  </div>
                ) : (
                  <div className='search-form-container'>
                    <button type='button' className='close-search-form' onClick={handleToggleIsSearchHidden}>X</button>
                    <div className='search-form'>
                      <input 
                        type='search' 
                        className='search-form-input' 
                        placeholder='search location'
                        onChange={handleChange}
                      />
                      <button type='buttonx' className='search-form-button' onClick={handleSearchSubmit}>Search</button>
                    </div>
                  </div>
                )

              }
              <span className='current-temperature'>{Math.floor(forecast.current.temp)}{units.temp}</span>
              <span className='current-temperature-description'>{forecast.current.weather[0].description}</span>
              <span className='current-date'> Today • {`${current_date.day}, ${current_date.date} ${current_date.month}`}</span>
              <span className='current-location'>{location_name}</span>
            </div>
            <br/>
            <div className='week-panel-container'>
              <div className='units-buttons'>
                <button type='button' className='metric-units' onClick={() => setNewUnits('metric')}>ºC</button>
                <button type='button' className='imperial-units' onClick={() => setNewUnits('imperial')}>ºF</button>
              </div>
              <div className='week-day-container'>
                {
                  forecast.daily.filter((day, index) => index < 6 && index !== 0)
                    .map((valid_day, index) => {
                      const { day, date, month } = getDate(valid_day.dt);

                      return (
                        <div className='week-day-card'>
                          <span className='week-day-date'>{index === 0 ? 'Tomorrow' : `${day}, ${date} ${month}`}</span>
                          <div className='day-temperatures'>
                            <span className='min-temp'>{Math.floor(valid_day.temp.min)}{units.temp}</span>
                            <span className='max-temp'>{Math.floor(valid_day.temp.max)}{units.temp}</span>
                          </div>
                        </div>
                      );
                    })
                }
              </div>
              <br/>
              <h1>Today's Hightlights</h1>
              <div className='today-hightlight'>
                <div className='wind-status-container'>
                  <span className='wind-status-title'>Wind Status</span>
                  <span className='wind-velocity'>{Math.floor(forecast.current.wind_speed * 3.6)}{units.wind_status}</span>
                  <span className='wind-direction'>WSW</span>
                </div>
                <div className='humidity-container'>
                  <span className='humidity-title'>Humidity</span>
                  <span className='humidity-percentage'>{forecast.current.humidity}%</span>
                  <span className='humidity-progress-bar'>"progress bar"</span>
                </div>
                <div className='visibility-container'>
                  <span className='visibility-title'>Visibility</span>
                  <span className='visibility'>{forecast.current.visibility / 1000} {units.visibility}</span>
                </div>
                <div className='air-pressure-container'>
                  <span className='air-pressure-title'>Air Pressure</span>
                  <span className='air-pressure'>{forecast.current.pressure} mb</span>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <h1>...Loading</h1>
        )
      }
    </div>
  );
};

export default App;

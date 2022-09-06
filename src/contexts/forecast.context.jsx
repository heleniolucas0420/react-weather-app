import { createContext, useState, useMemo } from 'react';

const getUnits = (units) => {
  switch (units) {
    case 'metric':
      return {
        temp: 'ºC',
        wind_status: 'kmph',
        visibility: 'km',
      };

    case 'imperial':
      return {
        temp: 'ºF',
        wind_status: 'mph',
        visibility: 'miles',
      };

    default:
      return {
        temp: 'ºK',
        wind_status: 'kmph',
        visibility: 'km',
      };
  }
};

export const ForecastContext = createContext({
  forecast: null,
  // setNewForecast: () => {},
  location: null,
  setNewLocation: () => {},
  units: null,
  setNewUnits: () => {},
  unit: 'metric',
  last_searched: [],
  is_search_hidden: true,
  toggleIsSearchHidden: () => {},
});

export const ForecastProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [units, setUnits] = useState(null);
  const [last_searched, setLastSearched] = useState([]);
  const [is_search_hidden, setIsSearchHidden] = useState(true);
  const [unit, setUnit] = useState('metric');

  const updateForecast = async (new_location, unit) => {
    try {
      const { latitude, longitude } = new_location;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_APP_OPEN_WEATHER_MAP_API_KEY
        }&exclude=hourly,minute,alerts&units=${unit}`
      );
      const response_forecast = await response.json();

      setForecast(response_forecast);
      setLocation(new_location);
      setUnits(getUnits(unit));
      setUnit(unit);
    } catch (error) {
      console.log(error);
    }
  };

  const setNewLocation = (new_location) => {
    updateForecast(new_location, unit);
  };

  const setNewUnits = (new_units) => {
    updateForecast(location, new_units);
  };

  const toggleIsSearchHidden = () => {
    setIsSearchHidden(!is_search_hidden);
  };

  const addToLastSearched = (location) => {
    if (last_searched.length === 3) {
      const new_last_searched = [...last_searched];

      if (new_last_searched.findIndex(location) === -1) {
        new_last_searched.pop();
        new_last_searched.splice(0, 0, location);
        setLastSearched(new_last_searched);
      }
    } else {
      const new_last_searched = [...last_searched];

      if (
        (new_last_searched.length !== 0 &&
          !new_last_searched.includes(location)) ||
        new_last_searched.length === 0
      ) {
        new_last_searched.splice(0, 0, location);
        setLastSearched(new_last_searched);
      }
    }
  };

  const value = {
    forecast,
    location,
    units,
    setNewLocation,
    setNewUnits,
    unit,
    last_searched,
    addToLastSearched,
    is_search_hidden,
    toggleIsSearchHidden,
  };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};

import { createContext, useState, useMemo } from 'react';

const getUnits = (units) => {
  switch (units) {
    case 'metric':
      return {
        temp: 'ºC',
        wind_status: 'kmph',
        visibility: 'km'
      };

    case 'imperial':
      return {
        temp: 'ºF',
        wind_status: 'mph',
        visibility: 'miles'
      };  

    default:
      return {
        temp: 'ºK',
        wind_status: 'kmph',
        visibility: 'km'
      };
  }
}

export const ForecastContext = createContext({
  forecast: null,
  // setNewForecast: () => {},
  location: null,
  setNewLocation: () => {},
  units: null,
  setNewUnits: () => {},
  unit: 'metric'
});

export const ForecastProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [units, setUnits] = useState(null);
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
    updateForecast(location, new_units)
  }

  const value = { forecast, location, units, setNewLocation, setNewUnits, unit };

  return <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>;
};

import { useContext } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';

import WeatherCard from '../weather-card/weather-card.component';

import './daily-forecast.styles.scss';

const DailyForecast = () => {
  const { forecast, units } = useContext(ForecastContext);

  return (
    <div className='daily-forecast'>
      {forecast.daily
        .filter((day, index) => index < 6 && index !== 0)
        .map((day, index) => (
          <WeatherCard key={index} valid_day={day} index={index} units={units}/>
        ))}
    </div>
  );
};

export default DailyForecast;

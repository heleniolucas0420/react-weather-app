import { useContext } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';

import WeatherCard from '../weather-card/weather-card.component';

import { getWeatherImage } from '../../utils/forecast.utils';

import './daily-forecast.styles.scss';

const DailyForecast = () => {
  const { forecast, units } = useContext(ForecastContext);

  return (
    <div className='daily-forecast'>
      {forecast.daily
        .filter((day, index) => index < 6 && index !== 0)
        .map((day, index) => {
          const image_url = getWeatherImage(day.weather[0].id);

          return <WeatherCard key={index} valid_day={day} index={index} units={units} image_url={image_url} />
        })}
    </div>
  );
};

export default DailyForecast;

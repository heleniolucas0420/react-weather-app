import { getDate } from '../../utils/date.utils';

import './weather-card.styles.scss';

const WeatherCard = ({ valid_day, index, units }) => {
  const { day, date, month } = getDate(valid_day.dt);

  return (
    <div key={index} className='weather-card-container'>
      <span className='weather-card-date'>
        {index === 0 ? 'Tomorrow' : `${day}, ${date} ${month}`}
      </span>
      <img src='' alt='weather-image' />
      <div className='day-temperatures'>
        <span className='min-temp'>
          {Math.floor(valid_day.temp.min)}
          {units.temp}
        </span>
        <span className='max-temp'>
          {Math.floor(valid_day.temp.max)}
          {units.temp}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;

import { useContext } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';

import { getWindDirection } from '../../utils/forecast.utils';

import './wind-direction.styles.scss';

const WindDirection = () => {
  const { forecast } = useContext(ForecastContext);
  const { wind_deg } = forecast.current;

  const styles = {
    transform: `rotate(${wind_deg}deg)`
  }

  return (
    <div className='wind-direction-container'>
      <span className='material-icons' style={styles}>navigation</span>
      {getWindDirection(wind_deg)}
    </div>
  );
};

export default WindDirection;

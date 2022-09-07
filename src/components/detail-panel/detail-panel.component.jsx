import { useContext } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';

import DailyForecast from '../daily-forecast/daily-forecast.component';
import HightlightCard from '../hightlight-card/hightlight-card.component';
import UnitsButton from '../units-button/units-button.component';

import './detail-panel.styles.scss';

const DetailPanel = () => {
  const { forecast, units } = useContext(ForecastContext);

  return (
    <div className='week-panel-container'>
      <div className='units-button-container'>
        <UnitsButton
          unit='metric'
          temp_unit='ºc'
        >
          ºC
        </UnitsButton>
        <UnitsButton
          unit='imperial'
          temp_unit='ºf'
        >
          ºF
        </UnitsButton>
      </div>
      <DailyForecast />
      <div className='today-hightlight-container'>
        <span style={{
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '28px',
          color: '#E7E7EB',
        }}>Today's Hightlights</span>
        <div className='today-hightlight'>
          <HightlightCard
            title='Wind Status'
            hightlight={Math.floor(forecast.current.wind_speed * 3.6)}
            hightlight_unit={units.wind_status}
          />
          <HightlightCard 
            title='Humidity'
            hightlight={forecast.current.humidity}
            hightlight_unit='%'
          />
          <HightlightCard 
            title='Visibility'
            hightlight={forecast.current.visibility / 1000}
            hightlight_unit={` ${units.visibility}`}
          />
          <HightlightCard 
            title='Air Pressure'
            hightlight={forecast.current.pressure}
            hightlight_unit=' mb'
          />
        </div>
      </div>
      <div className='footer'>
        <span>created by <a href='https://github.com/heleniolucas0420' target='_blank'>Helenio Lucas</a> - devChallenges.io</span>
      </div>
    </div>
  );
};

export default DetailPanel;

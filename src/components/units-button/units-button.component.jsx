import { useContext } from 'react';

import { ForecastContext } from '../../contexts/forecast.context';

import './units-button.styles.scss';

const UnitsButton = ({temp_unit, unit, children}) => {
  const { setNewUnits, units } = useContext(ForecastContext);

  return (
    <button
      type='button'
      className={`units-button ${units.temp.toLowerCase() === temp_unit ? 'active' : ''}`}
      onClick={() => setNewUnits(unit)}
    >
      {children}
    </button>
  );
};

export default UnitsButton;

import { Fragment, useState, useEffect, useContext } from 'react';

import { ForecastContext } from './contexts/forecast.context';

import TodayPanel from './components/today-panel/today-panel.component';
import DetailPanel from './components/detail-panel/detail-panel.component';
import Loader from './components/loader/loader.component';

import { getLocationName, getCurrentPosition } from './utils/location.utils';

import './App.css';

const App = () => {
  const [location_name, setLocationName] = useState('');
  const { setNewLocation, forecast } = useContext(ForecastContext);

  useEffect(() => {
    getCurrentPosition(async (position) => {
      setNewLocation(position.coords);

      const { name } = await getLocationName(position.coords);
      setLocationName(name);
    });
  }, []);

  return forecast ? (
    <div className='App'>
      <TodayPanel
        location_name={location_name}
        setLocationName={setLocationName}
      />
      <DetailPanel />
    </div>
  ) : (
    <Loader />
  );
};

export default App;

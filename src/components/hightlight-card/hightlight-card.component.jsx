import { Fragment } from 'react';

import './hightlight-card.styles.scss';

const HightlightCard = ({ title, hightlight, hightlight_unit, children }) => {
  return (
    <div className='hightlight-card-container'>
      <span className='hightlight-card-title'>{title}</span>
      <div className='hightlight'>
        {hightlight}
        <span className='hightlight-unit'>{hightlight_unit}</span>
      </div>
      {
        children && <div className='hightlight-children'>{children}</div>
      }
    </div>
  );
};

export default HightlightCard;

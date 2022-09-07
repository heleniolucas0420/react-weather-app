import './progress-bar.styles.scss';

const ProgressBar = ({ percentage }) => (
  <div className='progress-bar-container'>
    <div className='progress-bar-values'>
      <span className='progress-bar-value'>0</span>
      <span className='progress-bar-value'>50</span>
      <span className='progress-bar-value'>100</span>
    </div>
    <progress className='progress-bar' value={percentage} max='100'>
      {percentage}
    </progress>
    <span className='percentage-simbol'>%</span>
  </div>
);

export default ProgressBar;

import PropTypes from 'prop-types';
import './styles.scss';

const Spinner = ({ fullHeight }) => {
  return (
    <div className={`spinner-container${fullHeight ? 'full-height' : ''}`}>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  fullHeight: PropTypes.bool,
};

export default Spinner;

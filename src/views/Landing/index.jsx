import { Link } from 'react-router-dom';
import './styles.scss';

const Landing = () => {
  return (
    <div className="landing">
      <div className="wrapper">
        <div className="landing__img">
          <img src="/assets/images/landing.webp" alt="Do Something!" />
        </div>
        <div className="landing__text">
          <h2>
            Elevate Your Day with <strong>Do Something!</strong>
          </h2>
          <p>
            Discover excitement with Do Something! – the free app that curates
            lists of thrilling activities just for you. <br /> Tap into
            spontaneous adventures and create unforgettable memories. Download
            now for endless, free fun!
          </p>
          <button className="btn btn--secondary btn--jumbo">
            <Link to="/signup">Start now!</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

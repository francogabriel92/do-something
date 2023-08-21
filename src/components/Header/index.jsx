import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../contexts/authContext';
import LogOutButton from '../LogOutButton';
import './styles.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = AuthConsumer();

  const handleMenuClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Close menu when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__logo-container">
          <img
            src="/assets/images/logo.svg"
            alt="Do Something!"
            className="header__logo"
          />
          <div className="header__logo-text-container">
            <h1 className="header__logo-text">Do Something!</h1>
          </div>
        </div>
        <button
          className={`header__menu-btn ${isOpen ? 'open' : ''}`}
          onClick={handleMenuClick}
        >
          <span className="header__menu-btn-line"></span>
        </button>
        <nav className={`header__nav ${isOpen ? 'open' : ''}`}>
          <ul className="header__nav-list">
            {user ? (
              <>
                <li className="header__nav-item">
                  <Link to="/home" className="header__nav-link btn">
                    Home
                  </Link>
                </li>
                <li className="header__nav-item">
                  <LogOutButton text="Log Out" className="btn--secondary" />
                </li>
              </>
            ) : (
              <>
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link btn">
                    Login
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    to="/signup"
                    className="header__nav-link btn btn--secondary"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

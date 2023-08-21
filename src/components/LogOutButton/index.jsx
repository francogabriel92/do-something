import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../../contexts/authContext';

const LogOutButton = ({ className, text }) => {
  const { logOut } = AuthConsumer();
  const navigate = useNavigate();
  const classes = 'btn ' + (className ? className : '');

  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  return (
    <button className={classes} onClick={handleLogOut}>
      {text}
    </button>
  );
};

LogOutButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default LogOutButton;

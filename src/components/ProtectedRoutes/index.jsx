import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../../contexts/authContext';
import Spinner from '../Spinner';

const ProtectedRoutes = () => {
  const { user, isLoaded } = AuthConsumer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

  if (!isLoaded) return <Spinner fullHeight />;

  return <Outlet />;
};

export default ProtectedRoutes;

import { useEffect, useState } from 'react';
import authServices from '../services/authServices';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const login = (email, password) => {
    authServices.login(email, password);
    const loggedUser = authServices.getLoggedUser();
    setUser(loggedUser);
  };

  const signUp = authServices.signUp;

  const logOut = () => {
    authServices.logOut();
    setUser(null);
  };

  useEffect(() => {
    if (authServices.isLogged()) {
      const loggedUser = authServices.getLoggedUser();
      setUser(loggedUser);
    } else {
      setUser(null);
    }
    setIsLoaded(true);
  }, []);

  return { user, login, signUp, logOut, isLoaded };
}

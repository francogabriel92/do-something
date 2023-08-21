import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

// Example of a custom provider with logic extracted to a custom hook
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = () => {
  return useContext(AuthContext);
};

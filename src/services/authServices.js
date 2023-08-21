/**
 * This file contains all the services related to authentication
 * and is and example of a documentated file
 */

const localStorage = window.localStorage;

// Set login expiration time to 2 hours
const LOGIN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

/**
 * Check if user is logged
 * @returns {boolean} true if user is logged, false if not
 */
const isLogged = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  if (!loggedUser) return false;

  if (loggedUser.expirationDate < new Date().getTime()) {
    localStorage.removeItem('loggedUser');
    return false;
  }
  return true;
};

/**
 * Get logged user data
 * @returns {object} logged user data
 */
const getLoggedUser = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  return loggedUser;
};

/**
 * Check if user is registered and login
 * @param {String} email User email
 * @param {String} password User password
 * @returns {object} logged user data
 */
const login = (email, password) => {
  if (!email || !password) throw new Error('Missing fields in login');

  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));

  const registeredUser = registeredUsers?.find((user) => user.email === email);
  if (!registeredUser) throw new Error('User not registered');

  if (registeredUser.password !== password) throw new Error('Wrong password');

  const userToSave = {
    name: registeredUser.name,
    lastName: registeredUser.lastName,
    email: registeredUser.email,
    age: registeredUser.age,
    expirationDate: new Date().getTime() + LOGIN_EXPIRATION_TIME,
  };

  localStorage.setItem('loggedUser', JSON.stringify(userToSave));
  return userToSave;
};

/**
 * Logout user and remove data from localStorage
 */
const logOut = () => {
  localStorage.removeItem('loggedUser');
};

/**
 * Sign up user and save data in localStorage
 * @param {Object} userData User data to register
 * @param {String} userData.email User email
 * @param {String} userData.password User password
 * @param {String} userData.name User name
 * @param {String} userData.lastName User last name
 * @param {Number} userData.age User age
 */
const signUp = (userData) => {
  const { email, password, name, lastName, age } = userData;
  if (!email || !password || !name || !lastName || !age)
    throw new Error('Missing fields in user');

  const userToSave = {
    email,
    password,
    name,
    lastName,
    age,
  };

  const registeredUsers =
    JSON.parse(localStorage.getItem('registeredUsers')) || [];

  const userExists = registeredUsers.find((user) => user.email === email);
  if (userExists) throw new Error('User already exists');

  const newRegisteredUsers = [...registeredUsers, userToSave];
  localStorage.setItem('registeredUsers', JSON.stringify(newRegisteredUsers));
};

const authServices = {
  isLogged,
  getLoggedUser,
  login,
  logOut,
  signUp,
};

export default authServices;

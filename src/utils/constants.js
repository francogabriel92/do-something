export const API_URL = 'https://www.boredapi.com/api/activity/';

export const SIGNUP_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  lastName: '',
  age: 0,
};

export const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const TOASTS_IDS = {
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
};

// Types of activities from https://www.boredapi.com/documentation
export const ACTIVITIES_TYPES = [
  'education',
  'recreational',
  'social',
  'diy',
  'charity',
  'cooking',
  'relaxation',
  'music',
  'busywork',
];

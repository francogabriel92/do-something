import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords doesn't match")
    .required('You must confirm your password'),
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Lastname is required'),
  age: Yup.number()
    .required('Age is required')
    .min(4, 'You must be at least 4 years old'),
});

import { Formik } from 'formik';
import FormInput from '../../components/Form/FormInput';
import loginValidationSchema from '../../validations/login';
import { LOGIN_FORM_INITIAL_VALUES, TOASTS_IDS } from '../../utils/constants';
import { AuthConsumer } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const Login = () => {
  const { login } = AuthConsumer();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      login(values.email, values.password);
      navigate('/home');
    } catch (error) {
      toast(error.message, {
        type: 'error',
        toastId: TOASTS_IDS.LOGIN_ERROR,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="login__text">
          <h2>
            Get in and <br />
            <strong>Do Something!</strong>
          </h2>
        </div>
        <div className="login__form-container">
          <Formik
            initialValues={LOGIN_FORM_INITIAL_VALUES}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form>
                <FormInput
                  name="email"
                  type="text"
                  label="E-Mail"
                  icon="email"
                  placeholder="johndoe@example.com"
                />
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  icon="eye"
                />
                <div className="login__form-btn-container">
                  <button
                    className="login__form-btn btn"
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

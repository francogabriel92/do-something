import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { SIGNUP_FORM_INITIAL_VALUES, TOASTS_IDS } from '../../utils/constants';
import FormInput from '../../components/Form/FormInput';
import signUpValidationSchema from '../../validations/signUp';
import { AuthConsumer } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const SignUp = () => {
  const { signUp } = AuthConsumer();
  const navigate = useNavigate();

  const handleSubmitForm = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      signUp(values);
      toast('User created successfully!', {
        type: 'success',
        toastId: TOASTS_IDS.SIGNUP_SUCCESS,
      });
      // Here we can redirect the user to the login page for this challenge's purposes
      navigate('/login');
    } catch (error) {
      toast(error.message, {
        type: 'error',
        toastId: TOASTS_IDS.SIGNUP_ERROR,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup">
      <div className="wrapper">
        <div className="signup__text">
          <h2>
            Elevate your day <br />
            with <strong>Do Something!</strong>
          </h2>
        </div>
        <div className="signup__form-container">
          <Formik
            initialValues={SIGNUP_FORM_INITIAL_VALUES}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ resetForm, handleSubmit, isSubmitting }) => (
              <form>
                <FormInput
                  name="name"
                  type="text"
                  placeholder="Ex. John"
                  label="Name"
                  icon="name"
                />
                <FormInput
                  name="lastName"
                  type="text"
                  placeholder="Ex. Doe"
                  label="Lastname"
                  icon="lastname"
                />
                <FormInput
                  name="password"
                  placeholder="Should contain at least 6 characters"
                  type="password"
                  label="Password"
                  icon="eye"
                />
                <FormInput
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  type="password"
                  label="Confirm password"
                  icon="eye"
                />
                <FormInput
                  name="email"
                  type="text"
                  label="E-Mail"
                  icon="email"
                  placeholder="johndoe@example.com"
                />
                <FormInput
                  name="age"
                  type="number"
                  label="Age"
                  icon="calendar"
                />
                <div className="signup__form-btn-container">
                  <button
                    className="signup__form-btn btn btn--secondary"
                    type="button"
                    onClick={() => resetForm()}
                    disabled={isSubmitting}
                  >
                    Clear
                  </button>
                  <button
                    className="signup__form-btn btn"
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    Send
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

export default SignUp;

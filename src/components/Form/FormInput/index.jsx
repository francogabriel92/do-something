import { useId, useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import './styles.scss';

const FormInput = ({ name, type, placeholder, label, icon }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const isPassword = type === 'password';
  const passwordAriaLabel = showPassword ? 'Hide password' : 'Show password';
  const handlePasswordClick = () => setShowPassword((prevState) => !prevState);

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <div className={`input-icon ${isPassword ? 'password' : ''}`}>
          {isPassword ? (
            <figure
              aria-hidden="true"
              className={`icon icon-${icon}${!showPassword ? '-closed' : ''}`}
              role="button"
              aria-label={passwordAriaLabel}
              onClick={handlePasswordClick}
            />
          ) : (
            <figure aria-hidden="true" className={`icon icon-${icon}`} />
          )}
        </div>
        <input
          {...field}
          type={showPassword ? 'text' : type}
          id={id}
          placeholder={placeholder}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default FormInput;

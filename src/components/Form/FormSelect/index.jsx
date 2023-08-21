import Select from 'react-select';
import PropTypes from 'prop-types';
import './styles.scss';

const FormSelect = ({
  label,
  id,
  options,
  onChangeHandler,
  icon,
  placeholder,
  menuHeight,
}) => {
  return (
    <div className="select-input__group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <div className="input-icon">
          <figure aria-hidden="true" className={`icon icon-${icon}`} />
        </div>
        <Select
          id={id}
          onChange={(option) => onChangeHandler(option.value)}
          options={options}
          className="select-input__select"
          classNamePrefix="select-input__select"
          placeholder={placeholder}
          maxMenuHeight={menuHeight || 165}
        />
      </div>
    </div>
  );
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  menuHeight: PropTypes.number,
};

export default FormSelect;

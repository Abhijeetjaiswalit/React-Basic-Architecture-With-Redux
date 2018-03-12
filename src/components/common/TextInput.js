import React, { PropTypes } from 'react';

const TextInput = (field) => {
  const { type, className, maxLength, placeholder, meta: { asyncValidating, touched, error } } = field;
  return (
    <div className={`form-group ${touched && error ? 'has-danger' : ''} `}>
        <input
          {...field.input}
          type="text"
          className={className}
          placeholder={placeholder}
        />
        <div className="help-block help-block-error">
          {touched ? error : ''}
        </div>
    </div>
  );
};

// TextInput.propTypes = {
//   name: PropTypes.string,
//   label: PropTypes.string,
//   onChange: PropTypes.func,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   error: PropTypes.string
// };

export default TextInput;

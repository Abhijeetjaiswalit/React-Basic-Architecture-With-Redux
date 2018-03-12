import React, { PropTypes } from 'react';
import Editable from 'react-x-editable';

const SelectInput = (field) => {
  const { type, name,className,value,onChange, maxLength, placeholder, meta: { asyncValidating, touched, error } } = field;
  const options = [
    {
        text: 'China',
        value: 'CN'
    }, {
        text: 'India',
        value: 'IN'
    }, {
        text: 'United Kingdom (UK)',
        value: 'UK'
    }, {
        text: 'United States of America (USA)',
        value: 'USA'
    }
];
  return (
    <div className={`form-group ${touched && error ? 'has-danger' : ''} `}>
      <Editable
        name={name}
        dataType="select"
        mode={"popup"}
        options={options}
        value={value}
        onChange={onChange}
        title="Please select country"
        showButtons={true}
      />
      <div className="help-block help-block-error">
        {touched ? error : ''}
      </div>
    </div>
  );
};

// SelectInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   defaultOption: PropTypes.string,
//   value: PropTypes.string,
//   error: PropTypes.string,
//   options: PropTypes.arrayOf(PropTypes.object)
// };

export default SelectInput;

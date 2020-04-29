import React from "react";

import './custom-input.styles.scss';

const CustomInput = ({handleChange, label, ...otherProps}) => (
  <div className='group'>
    <input className='form-input' type='text' {...otherProps} onChange={handleChange} />
    {
      label ?
        (
          <label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>
            {label}
          </label>
        ): null
    }
  </div>
)

export default CustomInput;
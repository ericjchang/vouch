import React from 'react';
import './InputField.style.css';

const InputField = ({ placeholder, type = 'text', value, onChange, onInput, style, onKeyDown }) => {
  return (
    <div class='inputContainer' style={style}>
      <input
        className='input'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputField;

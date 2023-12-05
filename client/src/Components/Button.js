import React from 'react';
import './Button.style.css';

const Button = ({ label, onClick, type = 'button', style }) => {
  return (
    <button className='btn' type={type} onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default Button;

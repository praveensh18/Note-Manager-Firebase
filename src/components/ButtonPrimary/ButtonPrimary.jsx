import React from 'react';
import s from './style.module.css';

const ButtonPrimary = ({ className, children, onBtnClick, isDisabled, type }) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onBtnClick}
      className={`btn btn-primary ${s.add_button} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;

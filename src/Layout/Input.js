import React from 'react';
import '../styles/Input.css';

const Input = ({ register, name, title, preInput = "", ...rest }) => {

  return (
    <div className="input-container">
      <label htmlFor={name}>{title}</label>
      {preInput && <span className="pre-input">{preInput}</span>}
      <input style={{ textAlign: `${preInput && "right"}` }} label={name} {...register(name)} {...rest} />
    </div>

  );
};

export default Input;
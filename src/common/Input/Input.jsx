import React from 'react';
import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.form}>
      <label>{props.labelText}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Input;

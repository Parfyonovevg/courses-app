import React from 'react';
import styles from './input.module.css';

const Input: React.FC<{
  labelText?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (str: any) => void;
}> = (props) => {
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

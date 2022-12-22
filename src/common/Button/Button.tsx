import React from 'react';

import styles from './Button.module.css';

const Button: React.FC<{
  text?: string;
  onClick?: () => void;
  children?: any;
}> = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;

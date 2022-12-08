import React from 'react';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import { BUTTON_TEXT } from '../../constants';

import styles from './Header.module.css';

const Header = (props) => {
  const logout = () => props.logout();
  return (
    <div className={styles.header}>
      <Logo />
      {props.isLoggedIn && (
        <div className={styles.text}>
          <div>{props.user}</div>
          <Button onClick={logout} text={BUTTON_TEXT.logout_text} />
        </div>
      )}
    </div>
  );
};

export default Header;

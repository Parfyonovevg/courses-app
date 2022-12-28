import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import { BUTTON_TEXT } from '../../constants';

import styles from './Header.module.css';
import { deleteUser } from '../../store/user/reducer';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.user.user.isAuth);

  const exit = () => {
    navigate('/login');
    dispatch(deleteUser());
    localStorage.clear();
  };
  const userName = useAppSelector((state) => state.user.user.name);
  return (
    <div className={styles.header}>
      <Logo />
      {isLoggedIn && (
        <div className={styles.text}>
          <div>{userName}</div>
          <Button onClick={exit} text={BUTTON_TEXT.logout_text} />
        </div>
      )}
    </div>
  );
};

export default Header;

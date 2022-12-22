import axios from 'axios';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login: React.FC<{
  successLogin: (
    name: string,
    token: string,
    email: string,
    password: string
  ) => void;
}> = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate();

  const emailInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserEmail(event.target.value);
  const passwordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserPassword(event.target.value);

  async function login() {
    const user = {
      email: userEmail,
      password: userPassword,
    };
    try {
      await axios
        .post('http://localhost:4000/login', user)
        .then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            props.successLogin(
              response.data.user.name,
              response.data.result,
              response.data.user.email,
              response.data.user.password
            );
            navigate('/courses');
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  }
  const loginConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    login();
    setUserEmail('');
    setUserPassword('');
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={loginConfirm} className={styles.form}>
        <Input
          onChange={emailInput}
          type='email'
          labelText='Email'
          placeholder='Enter email'
        />
        <Input
          onChange={passwordInput}
          type='password'
          labelText='Password'
          placeholder='Enter password'
        />
        <Button text='Login' />
      </form>
      <p>
        If you don't have an account you can
        <Link to='/registration'> Registration</Link>
      </p>
    </div>
  );
};

export default Login;

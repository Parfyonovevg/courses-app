import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Registration.module.css';

const Registration: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate();

  async function sendNewUser() {
    const newUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    try {
      await axios
        .post(
          'http://localhost:4000/register',
          // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEOSyKidtKyeyRUbo24OXMctsW1m4JeVk',
          newUser
        )
        .then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            navigate('/login');
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const nameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(event.target.value);
  const emailInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserEmail(event.target.value);
  const passwordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserPassword(event.target.value);

  const registration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendNewUser();

    setUserName('');
    setUserEmail('');
    setUserPassword('');
  };

  return (
    <div className={styles.registration}>
      <h2>Registration</h2>
      <form onSubmit={registration} className={styles.form}>
        <Input
          value={userName}
          onChange={nameInput}
          type='text'
          labelText='Name'
          placeholder='Enter name'
        />
        <Input
          value={userEmail}
          onChange={emailInput}
          type='email'
          labelText='Email'
          placeholder='Enter email'
        />
        <Input
          value={userPassword}
          onChange={passwordInput}
          type='password'
          labelText='Password'
          placeholder='Enter password'
        />
        <Button text='Registration' />
      </form>
      <p>
        If you have an account you can <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Registration;

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import axios from 'axios';

import { Courses } from './components/Courses';
import { CourseForm } from './components/CourseForm';
import Layout from './components/Layout/layout';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo';

import { useAppDispatch, useAppSelector } from './hooks';
import { fetchCourses } from './store/courses/reducer';
import { fetchAuthors } from './store/authors/reducer';
import { login } from './store/user/reducer';
import { getUser } from './store/selectors';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

import EditCoursePage from './pages/EditCoursePage';


const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);

  const loginHandler = async (name: string, token: string, email: string) => {
    const response = await axios.get('http://localhost:4000/users/me', {
      headers: {
        Authorization: token,
      },
    });
    const user = response.data.result;
    console.log(user);
    dispatch(
      login({
        name,
        email,
        token,
        isAuth: !!token,
        role: user.role,
      })
    );
  };
  const isLoggedIn = user.isAuth;

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchAuthors());
  }, [dispatch]);

  const test = () => {
    console.log(user);
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/login' />} />
          <Route
            path='/login'
            element={
              !isLoggedIn ? (
                <Login successLogin={loginHandler} />
              ) : (
                <Navigate to='/courses' />
              )
            }
          />
          <Route
            path='/registration'
            element={
              !isLoggedIn ? <Registration /> : <Navigate to='/courses' />
            }
          />
          <Route
            path='/courses'
            element={isLoggedIn ? <Courses /> : <Navigate to='/login' />}
          />
          <Route
            path='/courses/add'
            element={
              <PrivateRouter>
                <CourseForm />
              </PrivateRouter>
            }
          />
          <Route
            path='/courses/update/:courseId'
            element={
              <PrivateRouter>
                <EditCoursePage />
              </PrivateRouter>
            }
          />
          <Route path='/courses/:courseId' element={<CourseInfo />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Route>
      </Routes>
      <button onClick={test}>Click</button>
    </>
  );
};

export default App;

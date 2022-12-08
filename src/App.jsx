import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { mockedAuthorsList, mockedCoursesList } from './constants';
import { Courses } from './components/Courses';
import { CreateCourse } from './components/CreateCourse';
import { Header } from './components/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { CourseInfo } from './components/CourseInfo';
import { useEffect } from 'react';

function App() {
  const initialToken = localStorage.getItem('token');
  const initialName = localStorage.getItem('name');
  const [allCourses, setAllCourses] = useState(mockedCoursesList);
  const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
  const [activeUser, setActiveUser] = useState(initialName);
  const [userToken, setUserToken] = useState(initialToken);
  const [isLoggedIn, setLoggedIn] = useState(!!userToken);

  const navigate = useNavigate();

  const login = (name, token) => {
    setLoggedIn(true);
    setActiveUser(name);
    setUserToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  };

  // useEffect(() => setLoggedIn(!!userToken), [userToken]);

  const logout = () => {
    setUserToken(null);
    setLoggedIn(false);
    localStorage.clear();
  };

  const addNewCourse = (course) => {
    setAllCourses((prev) => {
      return [...prev, course];
    });
    navigate('/courses');
  };

  const createNewAuthor = (authorName) => {
    if (authorName.length > 1) {
      setAllAuthors((prev) => {
        return [...prev, { name: authorName, id: uuidv4() }];
      });
    }
  };

  return (
    <>
      <Header user={activeUser} isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login successLogin={login} />} />
        <Route path='/registration' element={<Registration />} />
        <Route
          path='/courses'
          element={
            isLoggedIn ? (
              <Courses allCourses={allCourses} authors={allAuthors} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/courses/add'
          element={
            <CreateCourse
              allAuthors={allAuthors}
              addNewCourse={addNewCourse}
              createNewAuthor={createNewAuthor}
            />
          }
        />
        <Route
          path='/courses/:courseId'
          element={<CourseInfo authors={allAuthors} allCourses={allCourses} />}
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;

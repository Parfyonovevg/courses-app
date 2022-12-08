import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CourseCard } from './components/CourseCard';
import Button from '../../common/Button/Button';
import { SearchBar } from './components/SearchBar';

import { BUTTON_TEXT } from '../../constants';
import { pipeDuration } from '../../helpers/pipeDuration';

import styles from './Courses.module.css';

const Courses = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [visibleCourses, setVisibleCourses] = useState(props.allCourses);

  const search = (value) => setSearchInput(value);

  const authorsNames = (arrayOfId) => {
    let authors = [];
    arrayOfId.forEach((element) => {
      props.authors.forEach((author) => {
        if (author.id === element) {
          authors.push(author.name);
        }
      });
    });
    return authors;
  };

  useEffect(() => {
    setVisibleCourses(props.allCourses);
  }, [props.allCourses]);

  const confirmSearch = () => {
    setVisibleCourses(
      props.allCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchInput) ||
          course.id.toLowerCase().includes(searchInput)
      )
    );
  };
  const reset = () => setVisibleCourses(props.allCourses);

  return (
    <>
      <div className={styles.coursesHeader}>
        <SearchBar
          search={search}
          confirmSearch={confirmSearch}
          reset={reset}
        />

        <Link to='/courses/add'>
          <Button text={BUTTON_TEXT.add_new_course_text} />
        </Link>
      </div>
      {visibleCourses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          creationDate={course.creationDate}
          duration={pipeDuration(course.duration)}
          authors={authorsNames(course.authors)}
          id={course.id}
        />
      ))}
    </>
  );
};

export default Courses;

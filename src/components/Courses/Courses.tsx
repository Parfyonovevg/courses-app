import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CourseCard } from './components/CourseCard';
import Button from '../../common/Button/Button';
import { SearchBar } from './components/SearchBar';

import { BUTTON_TEXT } from '../../constants';
import { pipeDuration } from '../../helpers/pipeDuration';
import { useAppSelector } from '../../hooks';

import styles from './Courses.module.css';
import { getUser } from '../../store/selectors';

const Courses: React.FC = () => {
  const allCourses = useAppSelector((state) => state.courses.list);
  const allAuthors = useAppSelector((state) => state.authors.list);

  const [searchInput, setSearchInput] = useState('');
  const [visibleCourses, setVisibleCourses] = useState(allCourses);

  const user = useAppSelector(getUser);

  useEffect(() => setVisibleCourses(allCourses), [allCourses]);

  const search = (value: string) => setSearchInput(value);
  const authorsNames = (arrayOfId: string[]) => {
    let authors: string[] = [];
    arrayOfId.forEach((element) => {
      allAuthors.forEach((author) => {
        if (author.id === element) {
          authors.push(author.name);
        }
      });
    });
    return authors;
  };

  const confirmSearch = () => {
    setVisibleCourses(
      allCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchInput) ||
          course.id.toLowerCase().includes(searchInput)
      )
    );
  };
  const reset = () => setVisibleCourses(allCourses);

  const coursesDate = () => {
    return allCourses.map((course) => course.creationDate);
  };

  return (
    <>
      <div className={styles.coursesHeader}>
        <SearchBar
          search={search}
          confirmSearch={confirmSearch}
          reset={reset}
        />
        {user.role === 'admin' && (
          <Link to='/courses/add'>
            <Button text={BUTTON_TEXT.add_new_course_text} />
          </Link>
        )}
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

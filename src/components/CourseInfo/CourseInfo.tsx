import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';
import Course from '../../models/course';
import { useAppSelector } from '../../hooks';

import styles from './CourseInfo.module.css';
import { getAuthors, getCourses } from '../../store/selectors';

const CourseInfo: React.FC = () => {
  const courses = useAppSelector(getCourses);
  const allAuthors = useAppSelector(getAuthors);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course: Course | undefined = courses.find(
    (course) => course.id === courseId
  );

  const duration = pipeDuration(course!.duration);
  const dateOfCreation = dateGenerator(course!.creationDate);

  const getAuthorsNames = (authorsId: string[]) => {
    let authors: string[] = [];
    authorsId.forEach((id) => {
      allAuthors.forEach((author) => {
        if (author.id === id) {
          authors.push(author.name);
        }
      });
    });
    return authors;
  };

  const authors = getAuthorsNames(course!.authors).join(', ');

  return (
    <div className={styles.courseInfo}>
      <button onClick={() => navigate(-1)}>&#60; back to courses</button>
      <div>
        <h2>{course?.title}</h2>
        <div className={styles.text}>
          <p className={styles.description}>{course!.description}</p>
          <div className={styles.info}>
            <p>
              <span>ID: </span>
              {course?.id}
            </p>
            <p>
              <span>Duration: </span>
              {`${duration.hours}:${duration.minutes} hours`}
            </p>
            <p>
              <span>Created: </span>
              {dateOfCreation}
            </p>
            <p>
              <span>Authors: </span>
              {authors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;

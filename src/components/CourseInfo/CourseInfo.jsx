import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';

import styles from './CourseInfo.module.css';

const CourseInfo = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const course = props.allCourses.find(
    (course) => course.id === params.courseId
  );
  const duration = pipeDuration(course.duration);
  const dateOfCreation = dateGenerator(course.creationDate);

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

  const authors = authorsNames(course.authors).join(', ');

  return (
    <div className={styles.courseInfo}>
      <button onClick={() => navigate('/courses')}>
        &#60; back to courses
      </button>

      <div>
        <h2>{course.title}</h2>
        <div className={styles.text}>
          <p className={styles.description}>{course.description}</p>
          <div className={styles.info}>
            <p>
              <span>ID: </span>
              {course.id}
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

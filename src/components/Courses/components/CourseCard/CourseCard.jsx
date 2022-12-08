import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../common/Button/Button';

import { BUTTON_TEXT } from '../../../../constants';
import { dateGenerator } from '../../../../helpers/dateGenerator';

import styles from './CourseCard.module.css';

const CourseCard = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authors,
}) => {
  const authorsRow = authors.join(', ');
  const dateOfCreation = dateGenerator(creationDate);
  return (
    <div className={styles.course}>
      <div className={styles.description}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.information}>
        <p className={styles.authors}>
          <span>Authors: </span>
          {authorsRow}
        </p>
        <p>
          <span>Duration: </span>
          {`${duration.hours}:${duration.minutes} hours`}
        </p>
        <p>
          <span>Created: </span> {dateOfCreation}
        </p>
        <Link to={`/courses/${id}`}>
          <Button text={BUTTON_TEXT.show_course_text} />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

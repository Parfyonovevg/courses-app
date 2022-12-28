import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import { useDispatch } from 'react-redux';

import { BUTTON_TEXT } from '../../../../constants';
import { dateGenerator } from '../../../../helpers/dateGenerator';

import { deleteCourse } from '../../../../store/courses/reducer';

import styles from './CourseCard.module.css';
import { useAppSelector } from '../../../../hooks';
import { getUser } from '../../../../store/selectors';
import EditImg from './img/edit';
import Trash from './img/trash';

const CourseCard: React.FC<{
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: { hours: string; minutes: string };
  authors: string[];
}> = (props) => {
  const authorsRow = props.authors.join(', ');
  const user = useAppSelector(getUser);
  const dispatch = useDispatch();


  const deleteHandler = () => {
    dispatch(deleteCourse(props.id));
  };

  return (
    <div className={styles.course}>
      <div className={styles.description}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <div className={styles.information}>
        <p className={styles.authors}>
          <span>Authors: </span>
          {authorsRow}
        </p>
        <p>
          <span>Duration: </span>
          {`${props.duration.hours}:${props.duration.minutes} hours`}
        </p>
        <p>
          <span>Created: </span> {props.creationDate}
        </p>
        <div className={styles.buttons}>
          <Link to={`/courses/${props.id}`}>
            <Button text={BUTTON_TEXT.show_course_text} />
          </Link>
          {user.role === 'admin' && (
            <div className={styles.adminButtons}>
              <Link to={`/courses/update/${props.id}`}>
                <Button>Edit</Button>
              </Link>

              <Button onClick={deleteHandler}>Delete</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

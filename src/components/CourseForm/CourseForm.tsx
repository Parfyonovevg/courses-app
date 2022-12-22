import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { pipeDuration } from '../../helpers/pipeDuration';
import { BUTTON_TEXT, INPUT_TEXT } from '../../constants';
import { useAppSelector } from '../../hooks';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Author from '../../models/author';
import styles from './CourseForm.module.css';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../store/courses/reducer';
import { getAuthors } from '../../store/selectors';

import { createAuthor } from '../../store/authors/reducer';

const CreateCourse: React.FC = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState<number>(0);

  const allAuthors = useAppSelector(getAuthors);
  const duration = pipeDuration(durationInMinutes);
  const today = new Date().toISOString();

  const addingTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCourseTitle(event.target.value);

  const addingDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCourseDescription(event.target.value);

  const setDuration = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDurationInMinutes(Number(event.target.value));

  const addingAuthor = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewAuthorName(event.target.value);

  const createAuthorHandler = () => {
    dispatch(createAuthor(newAuthorName));
    setNewAuthorName('');
  };

  const addAuthorToCourse = (author: Author) => {
    setCourseAuthors((prev) => {
      return [...prev, author];
    });
  };

  const deleteAuthorFromCourse = (id: string) => {
    setCourseAuthors((prev) => prev.filter((el) => el.id !== id));
    console.log(allAuthors);
  };

  const createCourseHandler = () => {
    if (duration && courseAuthors && courseDescription && courseTitle) {
      const newCourse = {
        title: courseTitle,
        description: courseDescription,
        creationDate: today,
        duration: durationInMinutes,
        authors: courseAuthors.map((author) => author.id),
      };
      dispatch(createCourse(newCourse));
      navigate('/courses');
    } else {
      alert('Fill all fields');
    }
  };

  const test = () => {
    console.log();
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <Input
            labelText={INPUT_TEXT.new_course_title_label}
            placeholder={INPUT_TEXT.new_course_title_placeholder}
            type={INPUT_TEXT.type_text}
            onChange={addingTitle}
            value={courseTitle}
          />

          <Button
            text={BUTTON_TEXT.create_new_course_text}
            onClick={createCourseHandler}
          />
        </div>

        <div className={styles.description}>
          <p>{INPUT_TEXT.new_course_description_label}</p>
          <textarea
            placeholder={INPUT_TEXT.new_course_description_placeholder}
            onChange={addingDescription}
          />
        </div>
      </div>
      <section className={styles.infoBlock}>
        <div className={styles.information}>
          <p className={styles.titles}>Add author</p>
          <Input
            labelText={INPUT_TEXT.new_course_author_label}
            placeholder={INPUT_TEXT.new_course_author_placeholder}
            type={INPUT_TEXT.type_text}
            onChange={addingAuthor}
            value={newAuthorName}
          />
          <Button
            text={BUTTON_TEXT.create_author_text}
            onClick={createAuthorHandler}
          />
          <button onClick={test}>TEST</button>

          <p className={styles.titles}>Duration</p>
          <Input
            labelText={INPUT_TEXT.new_course_duration_label}
            placeholder={INPUT_TEXT.new_course_duration_placeholder}
            type={INPUT_TEXT.type_number}
            onChange={setDuration}
          />
          <p className={styles.duration}>
            Duration: <span>{duration.hours}</span>:
            <span>{duration.minutes}</span> hours
          </p>
        </div>
        <div className={styles.authors}>
          <p className={styles.titles}>Authors</p>
          {allAuthors.map((author) => (
            <div className={styles.author} key={author.id}>
              <p>{author.name}</p>
              <Button
                text={BUTTON_TEXT.add_author_text}
                onClick={() => addAuthorToCourse(author)}
              />

              {/* <button
                onClick={() => {
                  dispatch(deleteAuthor(author.id));
                  console.log(author.id);
                }}
              >
                DELETE
              </button> */}
            </div>
          ))}
          <p className={styles.titles}>Course author</p>
          {courseAuthors.map((author) => (
            <div key={author.id} className={styles.courseAuthors}>
              <span key={author.id}>{author.name}</span>
              <Button
                text={BUTTON_TEXT.delete_author_text}
                onClick={() => deleteAuthorFromCourse(author.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreateCourse;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { pipeDuration } from '../../helpers/pipeDuration';
import { BUTTON_TEXT, INPUT_TEXT } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './CreateCourse.module.css';

const CreateCourse = (props) => {
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(null);

  const setDuration = (event) => setDurationInMinutes(event.target.value);

  const duration = pipeDuration(durationInMinutes);

  const addingTitle = (event) => setCourseTitle(event.target.value);
  const addingDescription = (event) => setCourseDescription(event.target.value);

  let today = new Date().toLocaleDateString();

  const addingAuthor = (event) => setNewAuthorName(event.target.value);
  const createAuthor = () => {
    props.createNewAuthor(newAuthorName);
    setNewAuthorName('');
  };

  const addAuthorToCourse = (author) => {
    setCourseAuthors((prev) => {
      return [...prev, author];
    });
  };

  const deleteAuthor = (id) => {
    setCourseAuthors((prev) => prev.filter((el) => el.id !== id));
  };

  const createCourse = () => {
    if (
      courseTitle &&
      courseDescription &&
      courseAuthors.length > 0 &&
      durationInMinutes > 0
    ) {
      props.addNewCourse({
        title: courseTitle,
        description: courseDescription,
        authors: courseAuthors.map((author) => author.id),
        duration: durationInMinutes,
        creationDate: today,
        id: uuidv4(),
      });
    } else {
      alert('Please, fill all fields');
    }
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
          />

          <Button
            text={BUTTON_TEXT.create_new_course_text}
            onClick={createCourse}
          />
        </div>

        <div className={styles.description}>
          <p>{INPUT_TEXT.new_course_description_label}</p>
          <textarea
            rows='4'
            label={INPUT_TEXT.new_course_description_label}
            type='text'
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
            onClick={createAuthor}
          />

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
          {props.allAuthors.map((author) => (
            <div className={styles.author} key={author.id}>
              <p>{author.name}</p>
              <Button
                text={BUTTON_TEXT.add_author_text}
                onClick={() => addAuthorToCourse(author)}
              />
            </div>
          ))}
          <p className={styles.titles}>Course author</p>
          {courseAuthors.map((author) => (
            <div key={author.id} className={styles.courseAuthors}>
              <span key={author.id}>{author.name}</span>
              <Button
                text={BUTTON_TEXT.delete_author_text}
                onClick={() => deleteAuthor(author.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreateCourse;

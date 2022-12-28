import React from 'react';
import { CourseForm } from '../components/CourseForm';
import { useAppSelector } from '../hooks';
import { useParams } from 'react-router-dom';
import { getCourses } from '../store/selectors';

const EditCoursePage: React.FC = () => {
  const courses = useAppSelector(getCourses);
  const { courseId } = useParams();
  const course = courses.find((course) => course.id === courseId);

  return <CourseForm course={course} />;
};

export default EditCoursePage;

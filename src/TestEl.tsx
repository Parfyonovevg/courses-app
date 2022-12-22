import React from 'react';
import { useParams } from 'react-router-dom';

const TestEl = () => {
  const { courseId } = useParams();
  return <div>TestEl</div>;
};

export default TestEl;

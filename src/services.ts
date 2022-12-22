import axios from 'axios';
import Course from './models/course';
import { addAuthor } from './store/authors/reducer';

export const getAllCourses = async () => {
  try {
    const result = await axios
      .get('http://localhost:4000/courses/all')
      .then(function (response) {
        return response.data.result || [];
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAuthors = async () => {
  try {
    const result = await axios
      .get('http://localhost:4000/authors/all')
      .then(function (response) {
        return response.data.result || [];
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const sendNewAuthor = async (token: string, name: string) => {
  await axios.post(
    'http://localhost:4000/authors/add',
    { name },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
export const sendNewCourse = async (
  token: string,
  course: {
    title: string;
    description: string;
    duration: number;
    creationDate: string;
    authors: string[];
  }
) => {
  await axios.post(
    'http://localhost:4000/courses/add',
    {
      course,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const deleteAuthorFromServer = async (token: string, id: string) => {
  await axios.delete(
    `http://localhost:4000/authors/${id}`,

    {
      headers: {
        Authorization: token,
      },
    }
  );
};

import Author from '../models/author';
import Course from '../models/course';
import User from '../models/user';

export const getCourses = (state: Course[]) => state.courses.list;
export const getUser = (state: User) => state.user.user;
export const getAuthors = (state: Author[]) => state.authors.list;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import Course from '../../models/course';

export const fetchCourses = createAsyncThunk<
  Course[],
  undefined,
  { rejectValue: string }
>('courses/fetchCourses', async function getCourses(_, { rejectWithValue }) {
  try {
    const response = await axios.get('http://localhost:4000/courses/all');
    console.log(response.data.result);
    return response.data.result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async function (id: string, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;

    try {
      await axios.delete(`http://localhost:4000/courses/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(removeCourse(id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async function (course, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;

    try {
      const response = await axios.post(
        `http://localhost:4000/courses/add`,
        course,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const newCourse = response.data.result;
      dispatch(addCourse(newCourse));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async function (course, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;
    try {
      const response = await axios.put(
        `http://localhost:4000/courses/${course.id}`,
        course,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const upgradedCourse = response.data.result;
      dispatch(changeCourse(upgradedCourse));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type CourseState = {
  list: Course[];
};

const courseInitialState: CourseState = {
  list: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState: courseInitialState,
  reducers: {
    addCourse(state, action: PayloadAction<Course>) {
      state.list.push(action.payload);
    },
    removeCourse(state, action: PayloadAction<string>) {
      state.list = state.list.filter((course) => course.id !== action.payload);
    },
    changeCourse(state, action: PayloadAction<Course>) {
      state.list = state.list.map((course) => {
        if (course.id === action.payload.id) {
          course = action.payload;
        }
        return course;
      });
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCourses.pending, () => console.log('pending'))
  //     .addCase(
  //       fetchCourses.fulfilled,
  //       (state, action) => (state.list = action.payload)
  //     );
  // },

  extraReducers: {
    [fetchCourses.pending]: () => {
      console.log('pending');
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [fetchCourses.rejected]: () => {
      console.log('went wrong');
    },
  },
});

export const { addCourse, changeCourse, removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import Author from '../../models/author';

export const fetchAuthors = createAsyncThunk<Author[]>(
  'authors/fetchAuthors',
  async function getAuthors(_, { rejectWithValue }) {
    try {
      const response = await axios.get('http://localhost:4000/authors/all');
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAuthor = createAsyncThunk(
  'authors/deleteAuthor',
  async function (id: string, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;

    try {
      await axios.delete(`http://localhost:4000/authors/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(removeAuthor(id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const createAuthor = createAsyncThunk(
  'authors/createAuthor',
  async function (name: string, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;
    try {
      const response = await axios.post(
        `http://localhost:4000/authors/add`,
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const newAuthor = response.data.result;
      dispatch(addAuthor(newAuthor));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type AuthorsState = {
  list: Author[];
};

const authorsInitialState: AuthorsState = {
  list: [],
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsInitialState,
  reducers: {
    addAuthor(state, action: PayloadAction<Author>) {
      state.list.push(action.payload);
    },
    removeAuthor(state, action: PayloadAction<string>) {
      state.list = state.list.filter((author) => author.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchAuthors.pending]: () => {
      console.log('pending');
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [fetchAuthors.rejected]: () => {
      console.log('went wrong');
    },
  },
});

const { addAuthor, removeAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;

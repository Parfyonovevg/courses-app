import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import User from '../../models/user';
import axios from 'axios';

const userInitialState: User = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async function (_, { rejectWithValue, dispatch, getState }) {
    const token = getState().user.user.token;

    try {
      await axios.delete(`http://localhost:4000/logout`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(logout());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: userInitialState },

  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = userInitialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

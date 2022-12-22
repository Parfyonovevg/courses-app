import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/user';

const userInitialState: User = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

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

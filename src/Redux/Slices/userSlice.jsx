import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  avatar: sessionStorage.getItem('ytc-user') ? JSON.parse(sessionStorage.getItem('ytc-user')).photoURL : '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.avatar = action.payload.avatar;
    },
    clearUser: (state) => {
      state.avatar = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

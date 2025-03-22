import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   accessToken: sessionStorage.getItem('ytc-access-token') || null,
   user: sessionStorage.getItem('ytc-user') ? JSON.parse(sessionStorage.getItem('ytc-user')) : null,
   loading: false,
   error: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginRequest: state => {
         state.loading = true;
      },
      loginSuccess: (state, action) => {
         state.accessToken = action.payload.accessToken;
         state.user = action.payload.user;
         state.loading = false;
      },
      loginFail: (state, action) => {
         state.accessToken = null;
         state.loading = false;
         state.error = action.payload;
      },
      logOut: state => {
         state.accessToken = null;
         state.user = null;
      },
   },
});

export const {
   loginRequest,
   loginSuccess,
   loginFail,
   logOut,
} = authSlice.actions;

export default authSlice.reducer;

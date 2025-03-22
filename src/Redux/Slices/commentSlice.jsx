
import { createSlice } from '@reduxjs/toolkit';
import { getCommentsOfVideoById } from '../Actions/commentaction'; 

const initialState = {
  loading: false,
  comments: null,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsOfVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsOfVideoById.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(getCommentsOfVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
  },
});

export default commentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getRelatedVideos } from '../Actions/videoActions';

const relatedVideosSlice = createSlice({
  name: 'relatedVideos',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearRelatedVideos: (state) => {
      state.videos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRelatedVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.loading = false;
      })
      .addCase(getRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRelatedVideos } = relatedVideosSlice.actions;

export default relatedVideosSlice.reducer;

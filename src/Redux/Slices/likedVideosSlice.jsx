import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedVideos: [],
};

const likedVideosSlice = createSlice({
  name: 'likedVideos',
  initialState,
  reducers: {
    addLikedVideo: (state, action) => {
      state.likedVideos.push(action.payload);
    },
    removeLikedVideo: (state, action) => {
      state.likedVideos = state.likedVideos.filter(
        (video) => video.id !== action.payload.id
      );
    },
  },
});

export const { addLikedVideo, removeLikedVideo } = likedVideosSlice.actions;
export default likedVideosSlice.reducer;

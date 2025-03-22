// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../Slices/appslice';
import authReducer from '../Slices/authslice';
import userReducer from '../Slices/userSlice';
import videoSlice from '../Slices/videoSlice';
import channelDetailslice from '../Slices/channelDetailslice';
import commentSlice from '../Slices/commentSlice';
import channelVideosslice from '../Slices/channelVideosslice';
import likedVideosSlice from '../Slices/likedVideosSlice';
import relatedVideosSlice from '../Slices/relatedVideosSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    videos:videoSlice,
    channel:channelDetailslice,
    comments:commentSlice,
    channelVideos: channelVideosslice,
    likedVideos: likedVideosSlice,
    relatedVideos: relatedVideosSlice

  },
});
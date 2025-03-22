import { createSlice } from '@reduxjs/toolkit';
import { getVideosByChannel } from '../Actions/channelVideoaction';

const initialState = {
   videos: [],
   loading: false,
   error: null,
};

const channelVideosslice = createSlice({
   name: 'channelVideos',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getVideosByChannel.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getVideosByChannel.fulfilled, (state, action) => {
            state.videos = action.payload;
            state.loading = false;
         })
         .addCase(getVideosByChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export default channelVideosslice.reducer;

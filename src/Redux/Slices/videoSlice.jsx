import { createSlice } from '@reduxjs/toolkit';
import { getPopularVideos, getVideosByCategory, getVideoById, getVideosBySearch } from '../Actions/videoActions';

const initialState = {
  videos: [],
  activeCategory: 'All',
  nextPageToken: null,
  error: null,
  loading: false,
  selectedVideo: {
    video: null,
    loading: true,
    error: null,
  },
  search: {
    results: [],
    nextPageToken: null,
    loading: false,
    error: null,
  },
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      state.videos = [];
      state.nextPageToken = null;
    },
    clearSearchResults(state) {
      state.search.results = [];
      state.search.nextPageToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getPopularVideos
      .addCase(getPopularVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularVideos.fulfilled, (state, action) => {
        state.videos = [...state.videos, ...action.payload.videos]; 
        state.nextPageToken = action.payload.nextPageToken;
        state.loading = false;
      })
      .addCase(getPopularVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getVideosByCategory
      .addCase(getVideosByCategory.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(getVideosByCategory.fulfilled, (state, action) => {
        state.videos = [...state.videos, ...action.payload.videos]; 
        state.nextPageToken = action.payload.nextPageToken;
        state.loading = false;
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getVideoById and getVideosBySearch 
      .addCase(getVideoById.pending, (state) => {
        state.selectedVideo.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.selectedVideo.video = action.payload.video;
        state.selectedVideo.loading = false;
        state.selectedVideo.error = null;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.selectedVideo.video = null;
        state.selectedVideo.loading = false;
        state.selectedVideo.error = action.payload;
      })
      .addCase(getVideosBySearch.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(getVideosBySearch.fulfilled, (state, action) => {
        state.search.results = [...state.search.results, ...action.payload.items]; 
        state.search.loading = false;
        state.search.nextPageToken = action.payload.nextPageToken; 
    })
      .addCase(getVideosBySearch.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.payload;
      });
  },
});

export const { setActiveCategory, clearSearchResults } = videoSlice.actions;
export default videoSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../constants/api';

export const getPopularVideos = createAsyncThunk(
  'videos/getPopularVideos',
  async ({ nextPageToken }, { rejectWithValue }) => {
    try {
      const { data } = await request('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          regionCode: 'US',
          maxResults: 18,
          pageToken: nextPageToken,
          order: 'date',
        },
      });

   
      return {
        videos: data.items,
        nextPageToken: data.nextPageToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideosByCategory = createAsyncThunk(
  'videos/getVideosByCategory',
  async ({ keyword, nextPageToken }, { rejectWithValue }) => {
    try {
      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          maxResults: 18,
          q: keyword,
          type: 'video',
          pageToken: nextPageToken,
          order: 'date',
        },
      });
      return {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideoById = createAsyncThunk(
  'videos/getVideoById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await request('/videos', {
        params: {
          part: 'snippet,statistics',
          id: id,
        },
      });
      return {
        video: data.items[0],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRelatedVideos = createAsyncThunk(
  'videos/getRelatedVideos',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          q: query,
          maxResults: 45,
          type: 'video',
        },
      });
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideosBySearch = createAsyncThunk(
  'videos/getVideosBySearch',
  async ({ nextPageToken, keyword }, { rejectWithValue }) => {
    try {
      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: keyword,
          pageToken: nextPageToken,
          type: 'video,channel',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

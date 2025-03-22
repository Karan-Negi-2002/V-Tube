
import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../constants/api'; 

export const getCommentsOfVideoById = createAsyncThunk(
  'comments/getCommentsOfVideoById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await request('/commentThreads', {
        params: {
          part: 'snippet',
          videoId: id,
          maxResults: 40,
        },
      });
      return data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


  
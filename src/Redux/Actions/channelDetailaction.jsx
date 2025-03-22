import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../constants/api';

export const getChannelDetails = createAsyncThunk(
    'channel/getChannelDetails',
    async (id, { rejectWithValue }) => {
     
      try {
        const { data } = await request('/channels', {
          params: {
            part: 'snippet,statistics,contentDetails',
            id,
          },
        });
        return data.items[0];
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  
  
  
  
  

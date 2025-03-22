import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../constants/api'; 

export const getVideosByChannel = createAsyncThunk(
   'channel/getVideosByChannel',
   async (id, { rejectWithValue }) => {
      try {
         //  get upload playlist id
         const { data: { items } } = await request('/channels', {
            params: {
               part: 'contentDetails',
               id: id,
            },
         });
        
         
         const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

         //  get the videos using the id
         const { data } = await request('/playlistItems', {
            params: {
               part: 'snippet,contentDetails',
               playlistId: uploadPlaylistId,
               maxResults: 30,
            },
         });

         return data.items;
      } catch (error) {
         return rejectWithValue(error.response.data.message);
      }
   }
);

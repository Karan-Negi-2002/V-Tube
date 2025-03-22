import { createSlice } from '@reduxjs/toolkit';
import { getChannelDetails } from '../Actions/channelDetailaction'; 

const initialState = {
  channel: {},
  loadingChannelDetails: false,
  error: null,
};

const channelDetailslice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    clearChannel(state) {
      state.channel = {};
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannelDetails.pending, (state) => {
        state.loadingChannelDetails = true;
        state.error = null;
      })
      .addCase(getChannelDetails.fulfilled, (state, action) => {
        state.channel = action.payload;
        state.loadingChannelDetails = false;
        state.error = null;
      })
      .addCase(getChannelDetails.rejected, (state, action) => {
        state.channel = {};
        state.loadingChannelDetails = false;
        state.error = action.payload;
      });
  },
});

export const { clearChannel, setError } = channelDetailslice.actions;
export default channelDetailslice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import {
	fetchConfig,
  checkGameEndedAction,
	handleFetchConfigPending,
  handleFetchConfigRejected,
	handleFetchConfigFulfilled
} from '../actions/config-actions';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    endTime: Date.now() + 24 * 60 * 60 * 1000,
    maxWinners: 50,
    stealPosition: 25,
    cooldown: 10000,
    gemeEnded: false,
    status: REQUEST_STATUS.COMPLETE
  },
  reducers: {
    checkGameEnded: checkGameEndedAction
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, handleFetchConfigPending);
    builder.addCase(fetchConfig.rejected, handleFetchConfigRejected);
    builder.addCase(fetchConfig.fulfilled, handleFetchConfigFulfilled);
  }
});

// Action creators are generated for each case reducer function
// export const {} = cardSlice.actions;

export const selectConfigs = (state) => state.config;
export const { checkGameEnded } = configSlice.actions;
export default configSlice.reducer;

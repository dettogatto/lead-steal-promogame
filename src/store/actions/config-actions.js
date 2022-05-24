import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';
import { REQUEST_STATUS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';


export const fetchConfig = createAsyncThunk('auth/fetchConfig', async (payload, thunkAPI) => {
  const body = {}
  const { data } = await AxiosInstance.post('get-config.php', body);
  return data;
});

export const checkGameEndedAction = (state, action) => {
  state.gameEnded = (state.endTime * 1000 < Date.now());
}

export const handleFetchConfigPending = (state) => {
  state.status = REQUEST_STATUS.PENDING;
};

export const handleFetchConfigRejected = (state, action) => {
  state.status = REQUEST_STATUS.ERROR;
};

export const handleFetchConfigFulfilled = (state, { payload }) => {
  state.endTime = payload.end_time * 1000;
  state.maxWinners = payload.max_winners;
  state.stealPosition = payload.steal_position;
  state.gameEnded = (payload.end_time * 1000 < Date.now());
  state.status = REQUEST_STATUS.COMPLETE;
};

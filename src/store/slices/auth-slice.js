import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import {
	authLogin,
	handleFetchAuthPending,
  handleFetchAuthRejected,
	handleFetchAuthFulfilled
} from '../actions/auth-actions';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: "",
    username: "",
    error: "",
    status: REQUEST_STATUS.COMPLETE
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, handleFetchAuthPending);
    builder.addCase(authLogin.rejected, handleFetchAuthRejected);
    builder.addCase(authLogin.fulfilled, handleFetchAuthFulfilled);
  }
});

// Action creators are generated for each case reducer function
// export const {} = cardSlice.actions;

export const selectError = (state) => state.auth.error;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import {
	authChooseUsername,
	authLogin,
  authLogoutAction,
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
  reducers: {
    authLogout: authLogoutAction
  },
  extraReducers: (builder) => {
    builder.addCase(authChooseUsername.pending, handleFetchAuthPending);
    builder.addCase(authChooseUsername.rejected, handleFetchAuthRejected);
    builder.addCase(authChooseUsername.fulfilled, handleFetchAuthFulfilled);
    builder.addCase(authLogin.pending, handleFetchAuthPending);
    builder.addCase(authLogin.rejected, handleFetchAuthRejected);
    builder.addCase(authLogin.fulfilled, handleFetchAuthFulfilled);
  }
});

// Action creators are generated for each case reducer function
// export const {} = cardSlice.actions;

export const selectError = (state) => state.auth.error;
export const selectUser = (state) => ({email: state.auth.email, username: state.auth.username});
export const {authLogout} = authSlice.actions;
export default authSlice.reducer;

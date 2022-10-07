import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';
import { REQUEST_STATUS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { LOCALSTORAGE_EMAIL_FIELD } from '../../settings';


// Login

export const authChooseUsername = createAsyncThunk('auth/chooseUsername', async (payload, thunkAPI) => {
  const body = {
    email: emailError(payload.email),
    username: usernameError(payload.username),
  }
  const { data } = await AxiosInstance.post('login.php', body);
  if(!data.status){ throw data.message; }
  return data;
});

export const authLogin = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  const body = {
    email: emailError(payload.email),
  }
  const { data } = await AxiosInstance.post('login.php', body);
  if(!data.status){ throw data.message; }
  return data;
});

export const authLogoutAction = (state) => {
  state.email = "";
  state.username = "";
  localStorage.removeItem(LOCALSTORAGE_EMAIL_FIELD);
}

export const handleFetchAuthPending = (state) => {
  state.status = REQUEST_STATUS.PENDING;
};

export const handleFetchAuthRejected = (state, action) => {
  state.error = action.error.message;
  state.status = REQUEST_STATUS.ERROR;
};

export const handleFetchAuthFulfilled = (state, { payload }) => {
  state.username = payload.data.username;
  state.email = payload.data.email;
  state.status = REQUEST_STATUS.COMPLETE;
  if(payload.data.email){
    localStorage.setItem(LOCALSTORAGE_EMAIL_FIELD, payload.data.email);
  }
};


const emailError = (email) => {
  let re = /\S+@\S+\.\S+/;
  let res = (email && re.test(email));
  if(!res){ throw "Wrong email format"; }
  return email;
};

const usernameError = (username) => {
  if(!username || username.length < 3){ throw "Username must be 3 or more chars"; }
  if(username.length > 15){ throw "Username can't be longer than 15 chars"; }
  return username;
};

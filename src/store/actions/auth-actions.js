import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';
import { REQUEST_STATUS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';


// Login

export const authChooseUsername = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  const body = {
    email: emailError(payload.email),
    username: usernameError(payload.username),
  }
  const { data } = await AxiosInstance.post('login.php', body);
  return data;
});

export const authLogin = createAsyncThunk('auth/signUp', async (payload, thunkAPI) => {
  const body = {
    email: emailError(payload.email),
  }
  const { data } = await AxiosInstance.post('login.php', body);
  return data;
});

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
    localStorage.setItem('rc_user_email', payload.data.email);
  }
};


const emailError = (email) => {
  let re = /\S+@\S+\.\S+/;
  let res = (email && re.test(email));
  if(!res){ throw "Wrong email format"; }
  return email;
};

const usernameError = (username) => {
  let res = (username && username.length > 2);
  if(!res){ throw "Username must be 3 or more chars"; }
  return username;
};

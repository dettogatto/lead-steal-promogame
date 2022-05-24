import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './slices/auth-slice';
import configReducer from './slices/config-slice';
import {ENV} from '../settings';

const getMiddleware = (getDefaultMiddleware) => {
  let middle = getDefaultMiddleware();
  if(ENV === 'dev' || ENV === 'test'){
    middle = middle.concat(logger);
  }
  return middle;
}

export default configureStore({
	middleware: getMiddleware,
	reducer: {
    auth: authReducer,
    config: configReducer,
	}
});

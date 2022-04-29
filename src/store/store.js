import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './slices/auth-slice';

export default configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	reducer: {
    auth: authReducer
	}
});

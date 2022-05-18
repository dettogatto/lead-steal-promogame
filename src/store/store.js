import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './slices/auth-slice';
import configReducer from './slices/config-slice';

export default configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	reducer: {
    auth: authReducer,
    config: configReducer,
	}
});

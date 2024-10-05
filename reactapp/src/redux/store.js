import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;

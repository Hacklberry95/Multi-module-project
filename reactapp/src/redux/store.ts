import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';
import userReducer from './slicers/userSlice'; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer, // Add the user reducer if you're using it
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

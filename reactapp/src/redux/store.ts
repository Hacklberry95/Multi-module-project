import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slicers/authSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
    },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

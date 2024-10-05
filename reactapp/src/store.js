import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // This will combine all reducers

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Automatically integrates Redux DevTools
});

export default store;
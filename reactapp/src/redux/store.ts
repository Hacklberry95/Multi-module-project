import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';
import userReducer from './slicers/userSlice'; 
import sessionReducer from './reducers/sessionReducer';

const preloadedState = {
  session: JSON.parse(localStorage.getItem('session') || 'null') || {
    authenticated: false,
    user: null,
  },
};
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
		session: sessionReducer,
    },
	preloadedState,
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('session', JSON.stringify(state.session));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

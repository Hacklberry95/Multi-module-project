// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/UserModels';
import { initialState } from '../../models/LoginModels';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutAction(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
		registrationSuccess(state, action: PayloadAction<User>) {
		    state.isAuthenticated = true;
		    state.user = action.payload;
		    state.error = null;
		},
		registrationFailure(state, action: PayloadAction<string>) {
		    state.error = action.payload;
		}
    },
});

export const { loginSuccess, loginFailure, logoutAction, registrationSuccess, registrationFailure } = authSlice.actions;
export default authSlice.reducer;

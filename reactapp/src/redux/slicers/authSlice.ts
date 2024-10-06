import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the authentication state
interface AuthState {
    isAuthenticated: boolean;
    user: any | null; // Replace `any` with the appropriate user type
    error: string | null;
}

// Define the initial state using the AuthState interface
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<any>) { // Replace `any` with the appropriate user type
            state.isAuthenticated = true;
            state.user = action.payload; // Store user info in state
            state.error = null;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
});

// Export actions and reducer
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

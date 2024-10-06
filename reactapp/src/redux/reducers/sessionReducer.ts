import { SESSION_VALIDATE, SESSION_ERROR } from '../types';

// Define the shape of the session state
interface SessionState {
    user: any | null;  // Replace `any` with the actual user type if needed
    error: string | null;
    loading: boolean;
}

// Define the initial state
const initialState: SessionState = {
    user: null,
    error: null,
    loading: true, // Default to true since session validation starts on load
};

// Reducer function
export default function sessionReducer(state = initialState, action: any): SessionState {
    console.log("Session Reducer Action:", action);
    switch (action.type) {
        case SESSION_VALIDATE:
            console.log("Session validated:", action.payload);
            return {
                ...state,
                user: action.payload.user, // Only update user, not authenticated state
                loading: false, // Session validation is done
            };
        case SESSION_ERROR:
            console.log("Session error:", action.payload);
            return {
                ...state,
                error: action.payload,
                user: null,
                loading: false, // Stop loading in case of error
            };
        default:
            return state;
    }
}

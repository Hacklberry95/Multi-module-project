import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store';
import { loginSuccess, loginFailure, clearSession } from '../slicers/authSlice';
import { setSession } from '../slicers/authSlice'; 

export const login = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(loginSuccess(data.user));
      dispatch(setSession({ authenticated: true, user: data.user })); // Session is updated after login
    } else {
      throw new Error('Login failed');
    }
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const logout = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await fetch('http://localhost:8081/api/auth/logout', { method: 'POST', credentials: 'include' });
    dispatch(clearSession());
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const validateSession = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8081/api/auth/session', { credentials: 'include' });
        if (response.ok) {
            const data = await response.json();
            console.log('Session validation successful:', data);
            
            // Dispatch the setSession action to update the authentication state
            dispatch(setSession({ authenticated: data.authenticated, user: data.user }));
        } else {
            throw new Error('Session validation failed');
        }
    } catch (error: any) {
        console.error('Session validation error:', error.message);
        dispatch(logout()); // Logout on session validation error
    }
};
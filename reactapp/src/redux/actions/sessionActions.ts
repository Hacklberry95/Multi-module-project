import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';
import config from '../../config';
import { User }  from '../../models/UserModels';
import { loginSuccess, loginFailure, logoutAction } from '../slicers/authSlice';

// Login Action
export const login = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
	const response = await axios.post(`${config.apiBaseUrl}/auth/login`, {
	  username,
	  password,
	}, {
	  withCredentials: true
	});

    dispatch(loginSuccess(response.data.user));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
  }
};

// Logout Action
export const logout = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    await axios.post(`${config.apiBaseUrl}/auth/logout`, {}, { withCredentials: true });
    dispatch(logoutAction());
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Logout failed';
    dispatch(loginFailure(errorMessage));
  }
};


export const checkAuthentication = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/auth/session`, { withCredentials: true });

        if (response.status === 200) {
            const data = response.data;
            if (data.authenticated) {
                // Assuming the response includes these properties, adjust as needed
                const user: User = {
                    id: data.user.id,         // Make sure this exists in your response
                    username: data.user.username,
                    email: data.user.email,   // Ensure this exists
                    roles: data.user.roles     // Ensure this exists
                }; 
                dispatch(loginSuccess(user)); // Pass the User object
            } else {
                dispatch(loginFailure('Not authenticated'));
            }
        } else {
            dispatch(loginFailure('Failed to check authentication status'));
        }
    } catch (error: any) {
        dispatch(loginFailure(error.message));
    }
};

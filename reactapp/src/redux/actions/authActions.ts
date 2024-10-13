import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';
import config from '../../config';
import { User }  from '../../models/UserModels';
import { loginSuccess, loginFailure, logoutAction } from '../slicers/authSlice';

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
	console.log("RUNNING THROUGH LOGIN FAILURE RANDOMLY");
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
  }
};

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
                const user: User = {
                    id: data.user.id,         
                    username: data.user.username,
                    email: data.user.email,   
                    roles: data.user.roles   
                }; 
                dispatch(loginSuccess(user));
            } 
		}
    } catch (error: any) {
        dispatch(logoutAction());
    }
};

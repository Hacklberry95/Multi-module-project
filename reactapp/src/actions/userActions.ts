import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_USERS, USER_ERROR } from './types';

// Define the structure of the user data received from the API
export interface User {
  id: number; // Replace with actual user properties
  name: string;
  email: string;
}

// Define the structure of the error payload
interface UserError {
  msg: string;
  status?: number | null;
}

// Define the action types for clarity
interface GetUsersAction {
  type: typeof GET_USERS;
  payload: User[];
}

interface UserErrorAction {
  type: typeof USER_ERROR;
  payload: UserError;
}

interface CustomError {
    response?: {
        status: number;
        statusText: string;
    };
}

// Define the union type for actions
type UserActions = GetUsersAction | UserErrorAction;

// Action creator for getting users
export const getUsers = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    const res = await axios.get<User[]>('http://localhost:8081/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } 	catch (err) {
	    const error = err as CustomError; // Type assertion

	    const errorPayload: UserError = {
	        msg: error.response ? error.response.statusText : 'No response from server',
	        status: error.response ? error.response.status : null,
	    };

    dispatch({
      type: USER_ERROR,
      payload: errorPayload,
    });
  }
};

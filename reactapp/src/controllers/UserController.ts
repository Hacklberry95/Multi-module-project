import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_USERS, USER_ERROR } from '../redux/types'; // Ensure the path is correct
import { User } from '../models/User'; // Import your User interface
import { UserActions } from '../redux/actions/userActions'; // Ensure UserActions is imported correctly
import { CustomError, UserError } from "../models/User";

const API_URL = 'http://localhost:8081/api/auth'; // Keep the base API URL here

export class UserController {
  // Method to get users
  public static getUsers = () => async (dispatch: Dispatch<UserActions>) => {
    try {
      const res = await axios.get<User[]>(`${API_URL}/users`); // Adjust endpoint if necessary
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
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
}
export default UserController;

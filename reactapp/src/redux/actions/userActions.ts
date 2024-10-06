import { GET_USERS, USER_ERROR } from '../types';
import { User, UserError } from '../../models/User';


// Define the action types for clarity
interface GetUsersAction {
  type: typeof GET_USERS;
  payload: User[];
}

interface UserErrorAction {
  type: typeof USER_ERROR;
  payload: UserError;
}

// Define the union type for actions
export type UserActions = GetUsersAction | UserErrorAction;
import { GET_USERS, USER_ERROR } from '../types';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserError {
  msg: string;
  status?: number | null;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: UserError | null;
}

const initialState: UserState = {
  users: [],
  loading: true,
  error: null,
};

export default function userReducers(
  state = initialState,
  action: any
): UserState {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

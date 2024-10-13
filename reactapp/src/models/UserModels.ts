export interface User {
  id: number;
  username : string;
  roles: string;
  email: string;
}
export interface UserError {
  msg: string;
  status?: number | null;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: UserError | null;
}

export interface UserError {
  msg: string;
  status?: number | null;
}

export interface CustomError {
  response?: {
    status: number;
    statusText: string;
  };
}

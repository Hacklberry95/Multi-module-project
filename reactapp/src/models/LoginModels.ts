import { User } from '../models/UserModels';

export interface LoginResponse {
    message?: string;
}

export interface LoginError {
    message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};
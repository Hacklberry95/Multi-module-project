import { User } from '../models/UserModels';

export interface LoginResponse {
    message?: string;
    // Add other properties as needed based on your API response
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
//MAYBE WE CAN USE TYPES LATER DOWN THE ROAD??

import { User } from "../models/UserModels";

export const GET_USERS = 'GET_USERS';
export const USER_ERROR = 'USER_ERROR';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_ERROR = 'SESSION_ERROR';
export const SESSION_VALIDATE = 'SESSION_VALIDATE';


export type UserActionTypes =
    | { type: typeof GET_USERS; payload: User[] }
    | { type: typeof USER_ERROR; payload: { msg: string; status: number | null } };

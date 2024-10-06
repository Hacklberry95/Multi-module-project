// Action Types
export const GET_USERS = 'GET_USERS';
export const USER_ERROR = 'USER_ERROR';

// Union Type for Action Types
export type UserActionTypes =
    | { type: typeof GET_USERS; payload: any[] } // Replace `any[]` with the appropriate user type
    | { type: typeof USER_ERROR; payload: { msg: string; status: number | null } };

// Add more action types as needed for other entities

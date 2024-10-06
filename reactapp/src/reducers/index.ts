import { combineReducers } from 'redux';
import userReducers from './userReducers'; // Ensure this is the reducer

// Define the shape of the root state
export interface RootState {
  user: ReturnType<typeof userReducers>; // This gets the return type of the reducer
  // Add other slices of state here
}

const rootReducer = combineReducers({
  user: userReducers, // Pass the reducer, not the state
  // Add other reducers here
});

export default rootReducer;

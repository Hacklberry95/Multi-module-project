import { combineReducers } from 'redux';
import userReducers from './userReducers';

export default combineReducers({
  user: userReducers,
  // Add other reducers as you implement them (e.g., project, tasklist, task)
});

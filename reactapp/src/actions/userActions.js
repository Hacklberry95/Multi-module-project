import axios from 'axios';
import { GET_USERS, USER_ERROR } from './types';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:8081/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      // Server responded with a status code outside the 2xx range
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    } else if (err.request) {
      // Request was made but no response was received
      dispatch({
        type: USER_ERROR,
        payload: { msg: 'No response from server', status: null },
      });
    } else {
      // Something happened while setting up the request
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.message, status: null },
      });
    }
  }
};

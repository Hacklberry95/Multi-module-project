import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions/userActions';

const UsersList = () => {
  const dispatch = useDispatch();
  
  const userState = useSelector(state => state.user);
  const { users, loading, error } = userState;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log(users); // Log users data to inspect it
  }, [users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.msg}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.id} - {user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

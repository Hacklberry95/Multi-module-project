import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions/userActions';

const UsersList = () => {
  const dispatch = useDispatch();

  // Provide default empty values in case userState is undefined
  const userState = useSelector(state => state.user || {}); 
  const { users = [], loading = false, error = null } = userState; // Safeguard users, loading, and error

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
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>{user.id} - {user.username} - {user.email}</li>
          ))
        ) : (
          <div>No users found.</div>
        )}
      </ul>
    </div>
  );
};

export default UsersList;

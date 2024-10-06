import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Import your RootState type
//import UserController from '../controllers/UserController';
import { User, UserState } from '../models/User';

const UsersList: React.FC = () => {
// const dispatch = useDispatch();

  // Get the user state from Redux store
  const userState = useSelector((state: RootState) => state.user) as UserState;
  const { users, loading, error } = userState;

/*  useEffect(() => {
    dispatch<any>(UserController.getUsers);
  }, [dispatch]);
*/
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.msg}</p>;

  return (
    <div>
      <h1>Users List</h1>
      {users && users.map((user: User) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
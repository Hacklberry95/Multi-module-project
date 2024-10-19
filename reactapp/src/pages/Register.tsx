// src/components/Register.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../redux/actions/authActions';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store'; // Import the AppDispatch type
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; 

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Select isAuthenticated
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type for dispatch
  const error = useSelector((state: RootState) => state.auth.error);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!username || !email || !password) {
      return; // You can handle field validation here
    }
    // Dispatch the register action
    dispatch(register(username, email, password)); 
  };
  
  useEffect(() => {
      if (isAuthenticated) {
		dispatch(login(username, password));
        navigate("/home"); // Redirect to home if authenticated
      }
    }, [isAuthenticated, navigate, dispatch]);

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>} {/* Display error from Redux state */}
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

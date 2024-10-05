import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../services/AuthService';
import { loginSuccess, loginFailure } from '../redux/slicers/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // No need to expect token, just check for a valid response
            const user = await AuthService.login(username, password);
            dispatch(loginSuccess(user));  // Update Redux with authenticated user details
            navigate("/home");  // Navigate to home page after login
        } catch (err) {
            dispatch(loginFailure('Invalid credentials. Please try again.'));
        }
    };

    useEffect(() => {
        console.log(authState);
        if (authState.isAuthenticated) {
            navigate("/home");  // Redirect to home if already authenticated
        }
    }, [authState, navigate]);

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

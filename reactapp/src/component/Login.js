import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../services/AuthService';
import { loginSuccess, loginFailure } from '../redux//slicers/authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await AuthService.login(username, password);
            dispatch(loginSuccess(user));
			console.log("SUCCESSFUL LOGIN ATTEMPT");
            window.location.href = "/home"; // Redirect to home page after login
        } catch (err) {
            dispatch(loginFailure('Invalid credentials. Please try again.'));
        }
    };

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

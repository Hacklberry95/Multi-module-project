import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import AuthService from '../services/AuthService';
import { loginSuccess, loginFailure } from '../redux/slicers/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state: any) => state.auth); // Type this more specifically based on your auth state structure

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const user = await AuthService.login(username, password);
            dispatch(loginSuccess(user));
            navigate("/home");
        } catch (err) {
            dispatch(loginFailure('Invalid credentials. Please try again.'));
        }
    };

    useEffect(() => {
        console.log(authState);
    }, [authState]); 

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

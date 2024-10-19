import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { login } from '../redux/actions/authActions';
import { AppDispatch } from '../redux/store'; 
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
	const error = useSelector((state: RootState) => state.auth.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(login(username, password));
    };

	const handleRegisterRedirect = () => {
	        navigate('/register');
	    };
		
	useEffect(() => {
	    console.log("isAuthenticated:", isAuthenticated);

	    if (isAuthenticated) {
	        console.log("Navigating to /home");
	        navigate("/home");
	    }
	}, [isAuthenticated, dispatch, navigate]);


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
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
				<button onClick={handleRegisterRedirect} className="button">Register</button>
				{error && <p className="error-message">{error}</p>}
            </form>
			
        </div>
    );
};

export default Login;

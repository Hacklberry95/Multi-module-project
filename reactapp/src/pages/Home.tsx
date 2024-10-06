import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { logout } from '../redux/slicers/authSlice';
import '../styles/Home.css';
import ProtectedRoute from '../services/ProtectedRoute';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        try {
            await AuthService.logout(); // Call the logout service
            dispatch(logout()); // Update Redux state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="home-container">
                <h1>Welcome to the Home Page</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </ProtectedRoute>
    );
};

export default Home;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/actions/sessionActions';
import '../styles/Home.css';
import ProtectedRoute from '../controllers/ProtectedRoute';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        try {
           await dispatch(logout()); 
			console.log("Reactapp - logout");
            navigate('/login');
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

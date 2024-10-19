import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { logout } from '../redux/actions/authActions';
import '../styles/Home.css';
import ProtectedRoute from '../controllers/ProtectedRoute';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	
	useEffect(() => {
		    if (!isAuthenticated) {
		        console.log("Navigating to /home");
		        navigate("/login");
		    }
		}, [isAuthenticated, dispatch, navigate]);


    const handleLogout = async (): Promise<void> => {
        try {
            dispatch(logout()); 
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

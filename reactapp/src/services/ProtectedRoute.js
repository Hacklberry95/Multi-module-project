import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authState = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [authState, navigate]);

    return children; // Render children if authenticated
};

export default ProtectedRoute;

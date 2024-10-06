import React, { useEffect, ReactNode } from 'react'; // Ensure React import is included
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store'; // Adjust this path based on your project structure

interface ProtectedRouteProps {
    children: ReactNode; // Expect children to be of type ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authState = useSelector((state: RootState) => state.auth); // Use RootState for typing
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [authState.isAuthenticated, navigate]); // Only depend on isAuthenticated

    return <>{authState.isAuthenticated ? children : null}</>; // Render children if authenticated
};

export default ProtectedRoute;

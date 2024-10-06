import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Make sure to use the same slice
    const sessionLoading = useSelector((state: RootState) => state.session.loading);
    const navigate = useNavigate();

    useEffect(() => {
        // Only navigate if the session is fully loaded and the user is not authenticated
        if (!sessionLoading && !isAuthenticated) {
            console.log('Redirecting to /login because user is not authenticated');
            navigate('/login');
        }
    }, [isAuthenticated, sessionLoading, navigate]);

    // If the session is still loading, show a loading spinner or empty component
    if (sessionLoading) {
        return <div>Loading...</div>;
    }

    // If authenticated, render the children components
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

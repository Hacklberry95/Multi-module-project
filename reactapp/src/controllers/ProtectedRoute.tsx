import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
	
    useEffect(() => {
        if ( !isAuthenticated) {
            console.log('Redirecting to /login because user is not authenticated');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

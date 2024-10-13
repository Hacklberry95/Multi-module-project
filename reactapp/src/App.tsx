import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { RootState, AppDispatch } from './redux/store';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './controllers/ProtectedRoute';
import { checkAuthentication } from './redux/actions/authActions';

const App: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;

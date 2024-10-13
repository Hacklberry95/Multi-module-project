import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { RootState, AppDispatch } from './redux/store';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './controllers/ProtectedRoute';
import { checkAuthentication } from './redux/actions/sessionActions';

const App: React.FC = () => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const dispatch = useDispatch<AppDispatch>();

	    useEffect(() => {
	        dispatch(checkAuthentication()); // Check authentication on app load
	    }, 
		[dispatch]);
	
    return (
        <Provider store={store}>
		<Router>
		    <Routes>
		        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
		        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
		        {/* Other routes */}
		    </Routes>
		</Router>
        </Provider>
    );
};

export default App;

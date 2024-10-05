import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const navigate = useNavigate();


    if (!isAuthenticated) {
        navigate("/login");
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './component/Login';
import Home from './component/Home';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}
export default App;

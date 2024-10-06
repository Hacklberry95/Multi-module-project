import React from 'react';
import ReactDOM from 'react-dom/client'; // This is the updated import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create a root container for rendering in React 18
const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error('Root element not found');
} else {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    );
}

reportWebVitals();

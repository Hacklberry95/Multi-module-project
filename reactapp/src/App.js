import logo from './logo.svg';
import './App.css';
import React from 'react';
import UsersList from './component/UsersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         <UsersList/>
        </a>
      </header>
    </div>
  );
}

export default App;

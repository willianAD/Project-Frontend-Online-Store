import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

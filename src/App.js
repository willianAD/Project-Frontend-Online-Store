import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import logo from './images/logo.png';
import shopping from './images/shopping-cart.png';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="div-logo">
        <img src={ logo } alt="logo" />
      </div>
      <div className="shopping-cart-button">
        <Link to="shoppingcart">
          <button type="button" className="shopping-cart-button">
            <img src={ shopping } alt="shopping" className="shopping-cart" />
          </button>
        </Link>
      </div>
      <Routes />
    </BrowserRouter>
  );
}

export default App;

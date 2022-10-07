import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default Routes;

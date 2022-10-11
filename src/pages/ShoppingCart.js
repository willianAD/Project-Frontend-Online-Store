import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { history: { location } } = this.props;
    const { state: { cartItems } } = location;
    return (
      <main>
        <div>
          <p data-testid="shopping-cart-product-quantity">{cartItems.length}</p>
          <ul>
            {cartItems.map((product, index) => (
              <li
                key={ index }
                data-testid="shopping-cart-product-name"
              >
                {product.title}
              </li>

            ))}
          </ul>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.object }.isRequired;

export default ShoppingCart;

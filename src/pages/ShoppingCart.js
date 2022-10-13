import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cartItems'));
    if (storage) this.setState({ cartItems: storage });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <main>
        <div>
          <p data-testid="shopping-cart-product-quantity">{cartItems.length}</p>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={ index }
                data-testid="shopping-cart-product-name"
              >
                {item.title}
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

export default ShoppingCart;

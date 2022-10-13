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

  componentDidUpdate() {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  increaseItem = (pos) => {
    const { cartItems } = this.state;
    if (cartItems[pos].quantity < cartItems[pos].available_quantity) {
      cartItems[pos].quantity += 1;
    }
    this.setState({ cartItems });
  };

  decreaseItem = (pos) => {
    const { cartItems } = this.state;
    if (cartItems[pos].quantity > 1)cartItems[pos].quantity -= 1;
    this.setState({ cartItems });
  };

  removeItem = (pos) => {
    const { cartItems } = this.state;
    cartItems.splice(pos, 1);
    this.setState({ cartItems });
  };

  render() {
    const { cartItems } = this.state;
    return (
      <main>
        { cartItems.length ? (
          <div>
            <p>
              {cartItems.map((item) => item.quantity)
                .reduce((acc, curr) => acc + curr, 0)}
            </p>
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={ index }
                  data-testid="shopping-cart-product-name"
                >
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.removeItem(index) }
                  >
                    X
                  </button>
                  <span>{item.title}</span>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseItem(index) }
                  >
                    -
                  </button>
                  <span data-testid="shopping-cart-product-quantity">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseItem(index) }
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </main>
    );
  }
}

export default ShoppingCart;

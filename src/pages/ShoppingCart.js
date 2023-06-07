import React from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import seta from '../images/seta-voltar.png';
import '../styles/shoppingCart.css';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      url: [],
      total: 0,
    };
  }

  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('cartItems'));
    if (getStorage) {
      const cartList = getStorage.filter((e) => getProductById(e.id));
      const total = this.totalPrice();
      this.setState({
        cartItems: getStorage,
        url: cartList,
        total,
      });
    }
  }

  componentDidUpdate() {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  increaseItem = (index) => {
    const { cartItems } = this.state;
    if (cartItems[index].quantity <= cartItems[index].available_quantity) {
      cartItems[index].quantity += 1;
    }
    const total = this.totalPrice();
    this.setState({
      cartItems,
      total,
    });
  };

  decreaseItem = (index) => {
    const { cartItems } = this.state;
    if (cartItems[index].quantity > 1)cartItems[index].quantity -= 1;
    const total = this.totalPrice();
    this.setState({
      cartItems,
      total,
    });
  };

  removeItem = (index) => {
    const { cartItems } = this.state;
    cartItems.splice(index, 1);
    const total = this.totalPrice();
    this.setState({
      cartItems,
      total,
    });
  };

  totalPrice = () => {
    const { cartItems } = this.state;
    const subTotal = cartItems.map((e) => e.quantity * e.price);
    const result = subTotal.reduce((acc, cur) => +acc + +cur, +0);
    return result;
  };

  render() {
    const { cartItems, url, total } = this.state;
    return (
      <main>
        <div className="link-home">
          <Link to="/" className="link-home">
            <img src={ seta } alt="seta-voltar" className="seta-voltar" />
            Voltar
          </Link>
        </div>
        { cartItems.length ? (
          <div>
            <p className="title-qtd-itens">Quantidade de Itens</p>
            <p className="title-qtd-itens">
              {cartItems.map((item) => item.quantity)
                .reduce((acc, curr) => acc + curr, 0)}
            </p>
            <div>
              {cartItems.map((item, index) => (
                <div
                  key={ index }
                  className="shopping-cart-product-name"
                >
                  <button
                    type="button"
                    className="remove-product"
                    onClick={ () => this.removeItem(index) }
                  >
                    X
                  </button>
                  <div className="product-card">
                    <p>{item.title}</p>
                    <img src={ url[index].thumbnail } alt={ item.title } />
                    <p>{`R$${item.price}`}</p>
                  </div>
                  <button
                    type="button"
                    className="decrease-increase-quantity"
                    onClick={ () => this.decreaseItem(index) }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {item.quantity}
                  </p>
                  <button
                    type="button"
                    className="decrease-increase-quantity"
                    onClick={ () => this.increaseItem(index) }
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
            <div className="total-price">{ `Total: R$ ${total.toFixed(2)}` }</div>
          </div>
        ) : <span>Seu carrinho está vazio</span>}
      </main>
    );
  }
}

export default ShoppingCart;

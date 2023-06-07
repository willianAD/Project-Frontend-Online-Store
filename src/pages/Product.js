import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Form from './Form';
import shopping from '../images/shopping-cart.png';
import '../styles/product.css';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  }

  addToCart = () => {
    const { product } = this.state;
    product.quantity = 1;
    const cart = JSON.parse(localStorage.getItem('cartItems'));
    const newCart = (cart) || [];

    const repeated = newCart.find((item) => item.id === product.id);
    if (!repeated) newCart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
  };

  render() {
    const { product } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <section>
        {product && (
          <>
            <h1 className="product-detail-name">
              { product.title }
            </h1>
            <div>
              <div className="product-detail-image">
                <img
                  src={ product.pictures[0].url }
                  alt={ product.title }
                />
              </div>
              <div>
                <p />
                { product.shipping.free_shipping && <span>Frete grátis!</span> }
              </div>
              <span>
                {`R$ ${product.price}`}
              </span>
            </div>
          </>
        )}
        <div className="div-button">
          <button
            type="button"
            className="product-add-to-cart"
            onClick={ this.addToCart }
          >
            Adicionar ao Carrinho
          </button>
          <Link to="/shoppingcart">
            <button type="button" className="shopping-cart-button">
              <img src={ shopping } alt="shopping" className="shopping-cart2" />
            </button>
          </Link>
        </div>
        <Form
          id={ id }
        />
      </section>
    );
  }
}

Product.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
}.isRequired;

export default Product;

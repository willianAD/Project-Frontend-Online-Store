import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Form from './Form';

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
            <h1 data-testid="product-detail-name">
              {product.title}
              <span data-testid="product-detail-price">{` - R$ ${product.price}`}</span>
            </h1>
            <div>
              <img
                src={ product.pictures[0].url }
                alt={ product.title }
                data-testid="product-detail-image"
              />
              <div>
                <p />
                {product.shipping.free_shipping && <p>Frete grátis!</p>}
              </div>
            </div>
          </>
        )}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
        >
          Adicionar ao Carrinho
        </button>

        <Link to="/shoppingcart">
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
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

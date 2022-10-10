import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

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

  render() {
    const { product } = this.state;
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
        <Link to="/shoppingcart">
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
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
};

export default Product;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      categories: [],
      query: '',
      id: '',
      cartItems: [],
      category: '',
      buttonClicked: false,
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  addCartItem = () => {
    const { productList, id } = this.state;
    const product = productList.find((ele) => ele.id === id);
    console.log(product);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, product],
    }));
  };

  handleSearch = async () => {
    const { query, category } = this.state;
    const response = await getProductsFromCategoryAndQuery(category, query);
    const productList = response ? response.results : [];
    this.setState({ productList, buttonClicked: true });
  };

  cartClick = ({ target }) => {
    const { name } = target;
    this.setState({ id: name }, this.addCartItem);
  };

  handleClick = ({ target }) => {
    const { name } = target;
    this.setState({ category: name }, this.handleSearch);
  };

  render() {
    const { productList, categories, buttonClicked } = this.state;
    const { history: { push } } = this.props;
    console.log(push);
    return (
      <main>
        <nav>
          {
            categories.map((category) => (
              <button
                type="button"
                name={ category.id }
                key={ category.id }
                onClick={ this.handleClick }
                data-testid="category"
              >
                {category.name}
              </button>
            ))
          }
        </nav>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            name="query"
            data-testid="query-input"
            // value={ query }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleSearch }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <section className="product-list">
          {
            !buttonClicked && (
              <span data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            )
          }
          {
            productList.length
              ? (
                productList.map(({ id, title, thumbnail, price }, index) => (
                  <div key={ index }>
                    <Link
                      to={ `product/${id}` }
                      key={ id }
                      data-testid="product-detail-link"
                    >
                      <div data-testid="product" className="product-card" name={ id }>
                        <span>{title}</span>
                        <img src={ thumbnail } alt={ title } />
                        <span>{price}</span>
                      </div>
                    </Link>
                    <button
                      name={ id }
                      type="button"
                      onClick={ this.cartClick }
                      data-testid="product-add-to-cart"
                    >
                      Adicionar ao carrinho

                    </button>
                  </div>
                )))
              : buttonClicked && <span>Nenhum produto foi encontrado</span>
          }
        </section>
        <Link to={ { pathname: 'shoppingcart', state: this.state } }>
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
      </main>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object }.isRequired;

export default Home;

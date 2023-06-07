import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import pesquisa from '../images/pesquisa.png';
import '../styles/home.css';

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
    product.quantity = (!product.quantity) ? 1 : product.quantity + 1;

    this.setState(({ cartItems }) => {
      const repeated = cartItems.find((item) => item.id === id);
      return (repeated) ? ({ cartItems }) : ({ cartItems: [...cartItems, product] });
    }, () => {
      const { cartItems } = this.state;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
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
    const { productList, categories, buttonClicked, query } = this.state;
    return (
      <main>
        <nav className="nav-buttons">
          {
            categories.map((category) => (
              <button
                type="button"
                name={ category.id }
                key={ category.id }
                onClick={ this.handleClick }
                className="button-category"
              >
                {category.name}
              </button>
            ))
          }
        </nav>
        <div className="div-search">
          <label htmlFor="search" className="query-label">
            <input
              type="text"
              id="search"
              name="query"
              className="query-input"
              value={ query }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSearch }
            className="query-button"
          >
            <img src={ pesquisa } alt="search" className="button-search" />
          </button>
        </div>
        <section className="product-list">
          {
            !buttonClicked && (
              <span>
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            )
          }
          {
            productList.length
              ? (
                productList.map(({ id, title, thumbnail, price, shipping }, index) => (
                  <div key={ index }>
                    <Link
                      to={ { pathname: `product/${id}`, state: this.state } }
                      key={ id }
                    >
                      <div className="product-card" name={ id }>
                        <p>{title}</p>
                        <img src={ thumbnail } alt={ title } />
                        {shipping.free_shipping
                        && <p>Frete grátis!</p>}
                        <p>{`R$${price}`}</p>
                      </div>
                    </Link>
                    <div className="div-add-to-cart">
                      <button
                        name={ id }
                        type="button"
                        onClick={ this.cartClick }
                        className="product-add-to-cart"
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                )))
              : buttonClicked && <span>Nenhum produto foi encontrado</span>
          }
        </section>
      </main>
    );
  }
}

export default Home;

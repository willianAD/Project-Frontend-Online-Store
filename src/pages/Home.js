import React from 'react';
import { Link } from 'react-router-dom';
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
    // const storage = JSON.parse(localStorage.getItem('cartItems'));
    // if (storage) this.setState({ cartItems: storage });
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
    const { productList, categories, buttonClicked } = this.state;
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
                productList.map(({ id, title, thumbnail, price, shipping }, index) => (
                  <div key={ index }>
                    <Link
                      to={ { pathname: `product/${id}`, state: this.state } }
                      key={ id }
                      data-testid="product-detail-link"
                    >
                      <div data-testid="product" className="product-card" name={ id }>
                        <span>{title}</span>
                        <img src={ thumbnail } alt={ title } />
                        {shipping.free_shipping
                        && <p data-testid="free-shipping">Frete grátis!</p>}
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
        <Link to="shoppingcart">
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
      </main>
    );
  }
}

export default Home;

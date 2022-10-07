import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      categories: [],
      query: '',
      category: '',
      buttonClicked: false,
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleButton = async (event) => {
    event.preventDefault();
    const { query, category } = this.state;
    const response = await getProductsFromCategoryAndQuery(category, query);
    const productList = response ? response.results : [];
    this.setState({ productList, buttonClicked: true });
  };

  render() {
    const { productList, categories, buttonClicked } = this.state;
    return (
      <main>
        <nav>
          {categories.map((category) => (
            <button
              type="submit"
              key={ category.id }
              data-testid="category"
            >
              {category.name}
            </button>
          ))}
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
          type="submit"
          onClick={ this.handleButton }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <section>
          {!buttonClicked && (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )}
          {
            productList.length && buttonClicked
              ? (
                productList.map(({ id, title, thumbnail, price }) => (
                  <div key={ id } data-testid="product">
                    <span>{title}</span>
                    <img src={ thumbnail } alt={ title } />
                    <span>{price}</span>
                  </div>
                )))
              : <span>Nenhum produto foi encontrado</span>
          }

        </section>
      </main>
    );
  }
}

export default Home;

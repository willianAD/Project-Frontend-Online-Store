import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { productList, categories } = this.state;
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
          <input type="text" id="search" />
        </label>
        <button type="submit">Pesquisar</button>
        <section>
          {
            !productList.length
            && (
              <h2
                data-testid="home-initial-message"
              >
                {' '}
                Digite algum termo de pesquisa ou escolha uma categoria.

              </h2>
            )
          }

        </section>
        <Link to="/shoppingcart">
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
      </main>
    );
  }
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  render() {
    const { productList } = this.state;
    return (
      <main>
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

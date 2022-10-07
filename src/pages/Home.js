import React from 'react';

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
      </main>
    );
  }
}

export default Home;

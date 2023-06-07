import React from 'react';
import PropTypes from 'prop-types';
import '../styles/form.css';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nota: '',
      text: '',
      savedAvaliations: [],
      saveLocalStorage: [],
      messageError: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const storage = JSON.parse(localStorage.getItem(id));
    if (storage) {
      this.setState({ savedAvaliations: storage });
    }
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onSaveButtonClick = () => {
    const { email, nota, text, saveLocalStorage } = this.state;
    const { id } = this.props;
    if (email.includes('@trybe.com') && nota.length) {
      const saveInfos = {
        email,
        nota,
        text,
      };
      saveLocalStorage.push(saveInfos);
      this.setState((prevState) => ({
        savedAvaliations: [...prevState.savedAvaliations, saveInfos],
        email: '',
        nota: '',
        text: '',
        messageError: false,
      }));
      localStorage.setItem(id, JSON.stringify(saveLocalStorage));
    } else {
      this.setState({ messageError: true });
    }
  };

  render() {
    const { email, text, savedAvaliations, messageError } = this.state;
    return (
      <form>
        <h2>Avaliações</h2>
        <fieldset>
          <div className="div-avaliation">
            <label htmlFor="email" className="label-email">
              <input
                className="product-detail-email"
                type="email"
                id="email"
                name="email"
                onChange={ this.onInputChange }
                value={ email }
                placeholder="Email"
              />
            </label>
            <label htmlFor="um">
              <input
                data-testid="1-rating"
                id="um"
                name="nota"
                type="radio"
                value="1"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="dois">
              <input
                data-testid="2-rating"
                id="dois"
                name="nota"
                type="radio"
                value="2"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="tres">
              <input
                data-testid="3-rating"
                id="tres"
                name="nota"
                type="radio"
                value="3"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="quatro">
              <input
                data-testid="4-rating"
                id="quatro"
                name="nota"
                type="radio"
                value="4"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="cinco">
              <input
                data-testid="5-rating"
                id="cinco"
                name="nota"
                type="radio"
                value="5"
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div className="div-avaliation">
            <label htmlFor="text">
              <textarea
                className="product-detail-evaluation"
                id="text"
                name="text"
                placeholder="Menssagem (opcional)"
                cols="30"
                rows="10"
                value={ text }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div className="div-avaliation">
            <button
              className="submit-review-btn"
              type="button"
              onClick={ this.onSaveButtonClick }
            >
              Avaliar
            </button>
          </div>
        </fieldset>
        { messageError
          && <p className="error-msg">Campos inválidos</p>}
        <fieldset>
          {savedAvaliations.map((avaliation, index) => (
            <div key={ index }>
              <div className="div-avaliation">
                <p className="review-card">{ `Email: ${avaliation.email}` }</p>
                <p className="review-card">
                  { `Nota: ${avaliation.nota}` }
                </p>
                <p className="review-card">
                  { `Avaliação: ${avaliation.text}` }
                </p>
              </div>
              <div className="line" />
            </div>
          ))}
        </fieldset>
      </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;

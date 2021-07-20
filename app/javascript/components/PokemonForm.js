import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, isEmptyObject, validatePokemon } from '../helpers/helpers';
import PokemonNotFound from './PokemonNotFound';

class PokemonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: props.pokemon,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentWillReceiveProps({ pokemon }) {
    this.setState({ pokemon });
  }

  updatePokemon(key, value) {
    this.setState(prevState => ({
      pokemon: {
        ...prevState.pokemon,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { pokemon } = this.state;
    const errors = validatePokemon(pokemon);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(pokemon);
    }
  }

  handleInputChange(pokemon) {
    const { target } = pokemon;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updatePokemon(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the pokemon from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { pokemon } = this.state;
    const { path } = this.props;

    if (!pokemon.id && path === '/pokemons/:id/edit') return <PokemonNotFound />;

    const cancelURL = pokemon.id ? `/pokemons/${pokemon.id}` : '/pokemons';
    const title = pokemon.id ? `${pokemon.name}` : 'New Pokemon';

    return (
      <section className="section-edit">
      <div className="editForm">
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="pokemonForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="Name">
              <strong>Name:</strong>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.handleInputChange}
                value={pokemon.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="pokemon_type">
              <strong>Type:</strong>
              <input
                type="text"
                id="type"
                name="type"
                onChange={this.handleInputChange}
                value={pokemon.pokemon_type}
              />
            </label>
          </div>
          <div>
            <label htmlFor="url">
              <strong>urls:</strong>
              <input
                type="text"
                id="url"
                name="url"
                onChange={this.handleInputChange}
                value={pokemon.url}
              />
            </label>
          </div>
          <div>
            <label htmlFor="evolution">
              <strong>Evolution:</strong>
              <input
                type="text"
                id="evolution"
                name="evolution"
                onChange={this.handleInputChange}
                value={pokemon.evolution}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
      </section>
    );
  }
}

PokemonForm.propTypes = {
  pokemon: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

PokemonForm.defaultProps = {
  pokemon: {  
    name: '',
    pokemon_type: '',
    url: '',
    evolution: '',
  },
};

export default PokemonForm;
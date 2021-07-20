/* eslint-disable camelcase */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, pokemon_type, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;
    console.log(obj);
    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderPokemons() {
    const { activeId, pokemons } = this.props;
    const filteredPokemons = pokemons
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => b.id < a.id);

    return filteredPokemons.map(pokemon => (
      <li key={pokemon.id}>
        <Link to={`/pokemons/${pokemon.id}`} className={activeId === pokemon.id ? 'active' : ''}>
            <div className="poke-item">
              <img className="item-img" src={pokemon.url} alt={pokemon.id} />
              <figcaption className="item-name">{pokemon.name}</figcaption>
          </div> 
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="pokemonList">
        <h2>
        Pokemons
          <Link to="/pokemons/new">Add New Pokemon</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />
        <ul>{this.renderPokemons()}</ul>
      </section>
    );
  }
}

PokemonList.propTypes = {
  activeId: PropTypes.number,
  pokemons: PropTypes.arrayOf(PropTypes.object),
};

PokemonList.defaultProps = {
  activeId: undefined,
  pokemons: [],
};

export default PokemonList;

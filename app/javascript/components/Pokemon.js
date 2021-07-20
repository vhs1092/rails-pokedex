import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PokemonNotFound from './PokemonNotFound';

const Pokemon = ({ pokemon, onDelete }) => {
  if (!pokemon) return <PokemonNotFound />;

  return (
    <section className="pokemon-listing">
      <div className="item-card">
      <div className="controls">
        <Link className="button edit" to={`/pokemons/${pokemon.id}/edit`}>Edit </Link>
        <button className="button delete" type="button" onClick={() => onDelete(pokemon.id)}>
          Delete
        </button>
      </div>
      <section className="item-listing">
          <img src={pokemon.url} alt={pokemon.name} ></img>
          <figcaption>{pokemon.name}</figcaption>
        <p>Evolution: {pokemon.evolution}</p>
      </section>
      </div>
    </section>
  );
};

Pokemon.propTypes = {
  pokemon: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Pokemon.defaultProps = {
  pokemon: undefined,
};

export default Pokemon;

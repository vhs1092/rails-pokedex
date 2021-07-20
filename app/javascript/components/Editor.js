import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Pokemon from './Pokemon';
import PokemonForm from './PokemonForm';
import PokemonList from './PokemonList';
import Header from './Header';
import Footer from './Footer';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: null,
    };

    this.addPokemon = this.addPokemon.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/pokemons.json')
      .then(response => this.setState({ pokemons: response.data }))
      .catch(handleAjaxError);
  }

  addPokemon(newPokemon) {
    axios
      .post('/api/pokemons.json', newPokemon)
      .then((response) => {
        success('Pokemon Added!');
        const savedPokemon = response.data;
        this.setState(prevState => ({
          pokemons: [...prevState.pokemons, savedPokemon],
        }));
        const { history } = this.props;
        history.push(`/pokemons/${savedPokemon.id}`);
      })
      .catch(handleAjaxError);
  }

  deletePokemon(pokemonId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/pokemons/${pokemonId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Pokemon successfully deleted');
            const { history } = this.props;
            history.push('/pokemons');

            const { pokemons } = this.state;
            this.setState({ pokemons: pokemons.filter(pokemon => pokemon.id !== pokemonId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  updatePokemon(updatedPokemon) {
    axios
      .put(`/api/pokemons/${updatedPokemon.id}.json`, updatedPokemon)
      .then(() => {
        success('Pokemon updated');
        const { pokemons } = this.state;
        const idx = pokemons.findIndex(pokemon => pokemon.id === updatedPokemon.id);
        pokemons[idx] = updatedPokemon;
        const { history } = this.props;
        history.push(`/pokemons/${updatedPokemon.id}`);
        this.setState({ pokemons });
      })
      .catch(handleAjaxError);
  }

  render() {
    const { pokemons } = this.state;
    if (pokemons === null) return null;

    const { match } = this.props;
    const pokemonId = match.params.id;
    const pokemon = pokemons.find(e => e.id === Number(pokemonId));

    return (
      <div>
        <Header />
        <div className="grid">
          <PokemonList pokemons={pokemons} activeId={Number(pokemonId)} />
          <Switch>
            <PropsRoute path="/pokemons/new" component={PokemonForm} onSubmit={this.addPokemon} />
            <PropsRoute
              exact
              path="/pokemons/:id/edit"
              component={PokemonForm}
              pokemon={pokemon}
              onSubmit={this.updatePokemon}
            />
            <PropsRoute
              path="/pokemons/:id"
              component={Pokemon}
              pokemon={pokemon}
              onDelete={this.deletePokemon}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;

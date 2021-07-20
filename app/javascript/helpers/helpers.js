import {
  error
} from './notifications';

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validatePokemon = (pokemon) => {
  const errors = {};

  if (pokemon.pokemon_type === '') {
    errors.pokemon_type = 'You must enter an pokemon type';
  }
  if (pokemon.name === '') {
    errors.name = 'You must enter a name';
  }

  if (pokemon.url === '') {
    errors.url = 'You must enter at least one image url';
  }

  return errors;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};


Rails.application.routes.draw do
  root to: redirect('/pokemons')

  get 'pokemons', to: 'site#index'
  get 'pokemons/new', to: 'site#index'
  get 'pokemons/:id', to: 'site#index'
  get 'pokemons/:id/edit', to: 'site#index'

  namespace :api do
    resources :pokemons, only: %i[index show create destroy update]
  end
end

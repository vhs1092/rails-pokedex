# frozen_string_literal: true

class Api::PokemonsController < ApplicationController
  respond_to :json

  def index
    respond_with Pokemon.order(id: :ASC)
  end

  def show
    respond_with Pokemon.find(params[:id])
  end

  def create
    respond_with :api, Pokemon.create(pokemon_params)
  end

  def destroy
    respond_with Pokemon.destroy(params[:id])
  end

  def update
    pokemon = Pokemon.find(params['id'])
    pokemon.update(pokemon_params)
    respond_with Pokemon, json: pokemon
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(
      :id,
      :name,
      :pokemon_type,
      :url,
      :evolution,
    )
  end
end
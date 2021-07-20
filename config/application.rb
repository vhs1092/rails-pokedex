require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Pokedex
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # the public url base to request pokeapi
    config.api_url = 'http://pokeapi.co/api/v2/'
    # the public url base to serve the pokemon default image
    config.image_base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    # the public url base to serve the pokemon default back image
    config.image_back_base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'

  end
end

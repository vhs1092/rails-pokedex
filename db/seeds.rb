# frozen_string_literal: true
json = ActiveSupport::JSON.decode(File.read('db/seeds/pokemons.json'))
json.each do |record|
  Pokemon.create!(record)
  puts "created"
end

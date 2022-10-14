import React from "react";

const PokemonsContext = React.createContext({
  pokemonAbilityState: {},
  pokemonState: {},
  pokemonTypeState: {},
  addPokemonsFromType: () => {},
  checkStoragedDataExists: () => {},
  getPokemonsNotFetched: () => {},
  setFilterType: () => {},
  addPokemons: () => {},
  addPokemonsFromAbility: () => {},
  checkOnePokemonExists: () => {},
});

export default PokemonsContext;

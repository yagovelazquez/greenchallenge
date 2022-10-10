import React from "react";

const PokemonsContext = React.createContext({
  pokemons: {
    
  },
  pokemonTypeState: {
    flying: [],
    flyingPokemonDetails: {},
    normal: [],
    normalPokemonDetails: {},
    fire: [],
    firePokemonDetails: {},
    water: [],
    waterPokemonDetails: {},
    grass: [],
    grassPokemonDetails: {},
    electric: [],
    electricPokemonDetails: {},
    ice: [],
    icePokemonDetails: {},
    fighting: [],
    fightingPokemonDetails: {},
    poison: [],
    poisonPokemonDetails: {},
    ground: [],
    groundPokemonDetails: {},
    psychic: [],
    psychicPokemonDetails: {},
    bug: [],
    bugPokemonDetails: {},
    rock: [],
    rockPokemonDetails: {},
    ghost: [],
    ghostPokemonDetails: {},
    dark: [],
    darkPokemonDetails: {},
    dragon: [],
    dragonPokemonDetails: {},
    steel: [],
    steelPokemonDetails: {},
    fairy: [],
    fairyPokemonDetails: {},
  },
  addPokemonsFromType: () => {},
  checkStoragedTypeExists: () => {},
  getPokemonsNotFetched:  () => {},
  filterType: "",
  setFilterType: () => {}
});

export default PokemonsContext;
import PokemonsContext from "./pokemonsProvider";
import { useReducer, useState } from "react";

const defaultPokemonTypeState = {
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
};

function PokemonsProvider(props) {
  const [pokemonTypeState, setPokemonTypeState] = useState(
    defaultPokemonTypeState
  );


  const addPokemonsFromTypeHandler = (pokemonsFromType) => {
    setPokemonTypeState((prevState) => {
      return {
        ...prevState,
        [pokemonsFromType.name]: pokemonsFromType.pokemon,
      };
    });
  };

  const checkStoragedTypeExists = (type,state) => {
    return state[type]?.length > 0;
  };

  const checkOnePokemonExists = (type, pokemon) => {
    return pokemonTypeState[`${type}PokemonDetails`][pokemon] ? true : false;
  };

  const getPokemonsNotFetched = (pokemons, type) => {
  const pokemonsNotFetched = []
   
  pokemons.forEach(({pokemon}) => checkOnePokemonExists(type, pokemon.name) ? null : pokemonsNotFetched.push(pokemon))
  return pokemonsNotFetched
  };


  const pokemonsContext = {
    pokemonTypeState,
    addPokemonsFromType: addPokemonsFromTypeHandler,
    checkStoragedTypeExists,
    getPokemonsNotFetched,
  };

  return (
    <PokemonsContext.Provider value={pokemonsContext}>
      {props.children}
    </PokemonsContext.Provider>
  );
}

export default PokemonsProvider;
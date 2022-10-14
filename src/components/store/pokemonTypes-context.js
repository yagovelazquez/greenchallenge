import PokemonsContext from "./pokemonsProvider";
import { useState } from "react";

const defaultPokemonTypeState = {};

function PokemonsProvider(props) {
  const [pokemonTypeState, setPokemonTypeState] = useState(
    defaultPokemonTypeState
  );

  const [pokemonState, setPokemonState] = useState({});
  const [pokemonAbilityState, setPokemonAbilityState] = useState({});

  const addPokemonsFromTypeHandler = (pokemonsFromType) => {
    setPokemonTypeState((prevState) => {
      return {
        ...prevState,
        [pokemonsFromType.name]: pokemonsFromType.pokemon,
      };
    });
  };

  const addPokemonsFromAbilityHandler = (pokemonsFromAbility) => {
    setPokemonAbilityState((prevState) => {
      return {
        ...prevState,
        [pokemonsFromAbility.name]: pokemonsFromAbility.pokemon,
      };
    });
  };

  const checkStoragedDataExists = (type, state) => {
    return state[type] ? true : false;
  };

  const checkOnePokemonExists = (pokemon) => {
    return pokemonState[pokemon] ? true : false;
  };

  const getPokemonsNotFetched = (pokemons, isSearching) => {
    const pokemonsNotFetched = [];
    const pokemonsFetched = [];

    pokemons.forEach((item) => {
      let pokemon = isSearching ? item.pokemon : item;

      return checkOnePokemonExists(pokemon.name)
        ? pokemonsFetched.push(pokemonState[pokemon.name])
        : pokemonsNotFetched.push(pokemon);
    });
    return { pokemonsNotFetched, pokemonsFetched };
  };

  const addPokemonsHandler = (pokemons) => {
    let processedPokemons = {};
    pokemons.forEach((pokemon) => (processedPokemons[pokemon.name] = pokemon));
    setPokemonState((prevState) => {
      return { ...prevState, ...processedPokemons };
    });
  };

  const pokemonsContext = {
    pokemonTypeState,
    addPokemonsFromType: addPokemonsFromTypeHandler,
    checkStoragedDataExists,
    getPokemonsNotFetched,
    addPokemons: addPokemonsHandler,
    pokemonState,
    pokemonAbilityState,
    addPokemonsFromAbility: addPokemonsFromAbilityHandler,
    checkOnePokemonExists,
  };

  return (
    <PokemonsContext.Provider value={pokemonsContext}>
      {props.children}
    </PokemonsContext.Provider>
  );
}

export default PokemonsProvider;

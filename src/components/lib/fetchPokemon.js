import { serverUrl } from "../reactQuery/queryUrl";
import List from "../commom/List";
import { processPokemonData } from "./pokemonFn";

export const getPokemons = async (limit, offset) => {
  const url = `${serverUrl}/pokemon?limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    let errorMessage;
    errorMessage = data?.error;

    throw new Error(errorMessage || "Something went wrong");
  }

  return data;
};

export const getPokemonInfo = async (url) => {
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    let errorMessage;
    errorMessage = data?.error;

    throw new Error(errorMessage || "Something went wrong");
  }

  return data;
};

export const fetchPokemonDetails = (data) => {
  return data.map(async (pokemon) => {
    const pokemonInfo = await getPokemonInfo(pokemon.url);
    const processedPokemonData = processPokemonData(pokemonInfo);
    return processedPokemonData;
  });
};

export const fetchPokemons = async (limit, offset) => {
  try {
    const data = await getPokemons(limit, offset);
    const promises = data.results.map(async (pokemon) => {
      const pokemonInfo = await getPokemonInfo(pokemon.url);
      const processedPokemonData = processPokemonData(pokemonInfo);
      return processedPokemonData;
    });

    const results = await Promise.all(promises);

    return { pokemons: results, count: data.count };
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const searchPokemons = async (
  searchCategory,
  searchValue,
  limit,
  offset
) => {
  let url = `${serverUrl}/`;

  if (searchCategory === "name") {
    url += `pokemon/${searchValue}`;
  }

  if (searchCategory === "type") {
    url += `type/${searchValue}/`;
  }

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    let errorMessage;
    errorMessage = data?.error;

    throw new Error(errorMessage || "Something went wrong");
  }

  return data;
};

export const fetchSearchPokemon = async (
  searchCategory,
  searchValue,
  offset,
  limit,
  pokemonsCtx
) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  try {
    if (searchCategory === "name") {
      const data = await searchPokemons(searchCategory, lowerCaseSearchValue);
      const processedPokemonData = processPokemonData(data);
      return { pokemons: [processedPokemonData], count: 1 };
    }

    if (searchCategory === "abilities") {

    }

    if (searchCategory === "type") {

      let data;
      if (!pokemonsCtx.checkStoragedTypeExists(lowerCaseSearchValue, "pokemonTypeState")) {
        console.log("nao existe tipo")
        const serverData = await searchPokemons(
          searchCategory,
          lowerCaseSearchValue
        );
        pokemonsCtx.addPokemonsFromType(serverData);
        data = serverData.pokemon;
      }
      
      if (pokemonsCtx.checkStoragedTypeExists(lowerCaseSearchValue, "pokemonTypeState")) {
        console.log("existe tipo")
        data = pokemonsCtx.pokemons[lowerCaseSearchValue];
      }

      const paginatedPokemonData = data.slice(offset, offset + limit);

      const pokemonsNotFetched = pokemonsCtx.getPokemonsNotFetched(
        paginatedPokemonData,
        lowerCaseSearchValue
      );
      const promises = fetchPokemonDetails(pokemonsNotFetched);
      const results = await Promise.all(promises);

      return { pokemons: results, count: data.length };

    }
  } catch (error) {
    console.log(error, "aiii");
    throw new Error(error.message || "Something went wrong");
  }
};

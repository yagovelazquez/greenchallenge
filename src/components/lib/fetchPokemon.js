import { serverUrl } from "../reactQuery/queryUrl";
import List from "../commom/List";
import {
  processPokemonData,
  getFetchSearchPokemonFns,
  getCategoryUrl,
} from "./pokemonFn";

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

export const fetchPokemons = async (limit, offset, pokemonsCtx) => {
  try {
      const data = await getPokemons(limit, offset);

      const { pokemonsNotFetched, pokemonsFetched } =
      pokemonsCtx.getPokemonsNotFetched(
       data.results
      );

      if (pokemonsNotFetched.length === 0)
      return { pokemons: pokemonsFetched, count: data.count };

      const promises = fetchPokemonDetails(pokemonsNotFetched);
      const results = await Promise.all(promises);
      pokemonsCtx.addPokemons(results);

      if (pokemonsFetched.length === 0)
      return { pokemons: results, count: data.count };


      pokemonsFetched.push(...results);
      return { pokemons: pokemonsFetched, count: data.count };
  
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const searchPokemons = async (searchCategory, searchValue) => {
  const url = getCategoryUrl(searchCategory, searchValue);
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
  pokemonsCtx,
  offset,
  limit
) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  try {
    if (searchCategory === "name") {
      if (pokemonsCtx.checkOnePokemonExists(lowerCaseSearchValue))
        return {
          pokemons: [pokemonsCtx.pokemonState[lowerCaseSearchValue]],
          count: 1,
        };

      const data = await searchPokemons(searchCategory, lowerCaseSearchValue);
      const processedPokemonData = processPokemonData(data);
      pokemonsCtx.addPokemons([processedPokemonData]);

      return { pokemons: [processedPokemonData], count: 1 };
    }

    const { pokemonsCtxCategoryState, pokemonCtxAddFromCategory } =
      getFetchSearchPokemonFns(searchCategory, pokemonsCtx);
    let data;

    if (
      !pokemonsCtx.checkStoragedDataExists(
        lowerCaseSearchValue,
        pokemonsCtxCategoryState
      )
    ) {
      const serverData = await searchPokemons(
        searchCategory,
        lowerCaseSearchValue
      );

      pokemonCtxAddFromCategory(serverData);
      data = serverData.pokemon;
    }

    if (
      pokemonsCtx.checkStoragedDataExists(
        lowerCaseSearchValue,
        pokemonsCtxCategoryState
      )
    ) {
      data = pokemonsCtxCategoryState[lowerCaseSearchValue];
    }

    const paginatedPokemonData = data.slice(offset, offset + limit);

    const { pokemonsNotFetched, pokemonsFetched } =
      pokemonsCtx.getPokemonsNotFetched(
        paginatedPokemonData, true
      );

    if (pokemonsNotFetched.length === 0)
      return { pokemons: pokemonsFetched, count: data.length };

    const promises = fetchPokemonDetails(pokemonsNotFetched);
    const results = await Promise.all(promises);
    pokemonsCtx.addPokemons(results);

    if (pokemonsFetched.length === 0)
      return { pokemons: results, count: data.length };

    pokemonsFetched.push(...results);
    return { pokemons: pokemonsFetched, count: data.length };
  } catch (error) {
    console.log(error, "aiii");
    throw new Error(error.message || "Something went wrong");
  }
};

import { serverUrl } from "../reactQuery/queryUrl";
import PokemonTypes from './../commom/PokemonTypes';


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

export const fetchPokemons = async (limit, offset) => {
  try {
    const data = await getPokemons(limit, offset);
    const promises = data.results.map(async (pokemon) => {
    const {name, types, id, height, weight, abilities} = await getPokemonInfo(pokemon.url)
    const typeComponent = <PokemonTypes types={types} /> 
    const processedPokemonData =  {
        name,types,id,height,weight,abilities, typeComponent
    }

    return processedPokemonData
    });

    const results = await Promise.all(promises);

    return results

  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

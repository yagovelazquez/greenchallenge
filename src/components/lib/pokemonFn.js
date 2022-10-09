import PokemonTypes from "../commom/PokemonTypes";
import { queryKeys } from "../reactQuery/queryConstants";

export const isPokemonQueryEnabled = (debouncedInputValue) =>
  debouncedInputValue ? false : true;

export const querySearchPokemonKeys = (
  searchCategory,
  actualCategoryValue,
  debouncedInputValue,
  offset,
  limit
) => {
  let keys;
  if (searchCategory === "name") {
    keys = [queryKeys.pokemons, queryKeys.name, debouncedInputValue];
  }

  if (searchCategory === "type") {
    keys = [queryKeys.pokemons, queryKeys.type,debouncedInputValue , offset, limit];
  }

  return isPokemonSearchEnabled(
    searchCategory,
    actualCategoryValue,
    debouncedInputValue
  )
    ? keys
    : [];
};

export const isPokemonSearchEnabled = (
  actualCategoryValue,
  searchCatergory,
  debouncedInputValue
) =>
  actualCategoryValue === searchCatergory && debouncedInputValue ? true : false;

export const processPokemonData = ({
  name,
  types,
  id,
  height,
  weight,
  abilities,
}) => {
  const typeComponent = <PokemonTypes types={types} />;
  const processedTypes = types.map((typeData) => typeData.type.name).join(", ");
  const processedPokemonData = {
    name,
    types: processedTypes,
    id,
    height,
    weight,
    abilities,
    typeComponent,
  };
  return processedPokemonData;
};



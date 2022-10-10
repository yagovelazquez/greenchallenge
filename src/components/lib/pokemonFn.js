import PokemonTypes from "../commom/PokemonTypes";
import { queryKeys } from "../reactQuery/queryConstants";
import Image from './../commom/Image';

export const isPokemonQueryEnabled = (debouncedInputValue, searchCategory) =>
  (debouncedInputValue && searchCategory) ? false : true;

export const getPokemonImageUrl = (sprites) => sprites.front_default || sprites.versions["generation-viii"].icons.front_default   || sprites.other["official-artwork"].front_default;  

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
  sprites,

}) => {

  const typeComponent = <PokemonTypes types={types} />;
  const processedTypes = types.map((typeData) => typeData.type.name).join(", ");
  const processedPokemonData = {
    name,
    types: processedTypes,
    image:  <Image url={getPokemonImageUrl(sprites)}  className="h-[60px] w-[60px]"  alt={name} />,
    id,
    height,
    weight,
    abilities,
    typeComponent,
  };
  return processedPokemonData;
};



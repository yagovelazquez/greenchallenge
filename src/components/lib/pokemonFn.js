import List from "../commom/List";
import { queryKeys } from "../reactQuery/queryConstants";
import Image from "./../commom/Image";
import { serverUrl } from "../reactQuery/queryUrl";

export const isPokemonQueryEnabled = (debouncedInputValue, searchCategory) =>
  debouncedInputValue && searchCategory ? false : true;

export const getPokemonImageUrl = (sprites) =>
  sprites.front_default ||
  sprites.versions["generation-viii"].icons.front_default ||
  sprites.other["official-artwork"].front_default;

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

  if (searchCategory === "ability") {
    keys = [
      queryKeys.pokemons,
      queryKeys.ability,
      debouncedInputValue,
      offset,
      limit,
    ];
  }

  if (searchCategory === "type") {
    keys = [
      queryKeys.pokemons,
      queryKeys.type,
      debouncedInputValue,
      offset,
      limit,
    ];
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
  stats,
}) => {
  const typeComponent = <List listItems={types} variant="typeIcon" />;
  const processedTypes = types.map((typeData) => typeData.type.name).join(", ");
  const abilitiesComponent = (
    <List listItems={abilities} variant={"abilitiesList"} />
  );
  const processedStats = {};
  stats.forEach(({ stat, base_stat }) => {
    processedStats[stat["name"]] = base_stat;
  });

  const processedPokemonData = {
    name,
    types: processedTypes,
    image: (
      <Image
        url={getPokemonImageUrl(sprites)}
        className="h-[60px] w-[60px]"
        alt={name}
      />
    ),
    id,
    height,
    weight,
    abilities,
    typeComponent,
    abilitiesComponent,
    ...processedStats,
  };
  return processedPokemonData;
};

export const getFetchSearchPokemonFns = (searchCategory, pokemonsCtx) => {
  switch (searchCategory) {
    case "ability":
      return {
        pokemonsCtxCategoryState: pokemonsCtx.pokemonAbilityState,
        pokemonCtxAddFromCategory: pokemonsCtx.addPokemonsFromAbility,
      };
    case "name":
      return {
        pokemonsCtxCategoryState: null,
        pokemonCtxAddFromCategory: null,
      };
    case "type":
      return {
        pokemonsCtxCategoryState: pokemonsCtx.pokemonTypeState,
        pokemonCtxAddFromCategory: pokemonsCtx.addPokemonsFromType,
      };
    default:
      return {
        pokemonsCtxCategoryState: null,
        pokemonCtxAddFromCategory: null,
      };
  }
};

export const getCategoryUrl = (searchCategory, searchValue) => {
  let url = `${serverUrl}/`;

  switch (searchCategory) {
    case "ability":
      url += `ability/${searchValue}/`;
      return url;
    case "name":
      url += `pokemon/${searchValue}`;
      return url;
    case "type":
      url += `type/${searchValue}/`;
      return url;

    default:
      return null;
  }
};

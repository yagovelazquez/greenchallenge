import List from "../commom/List";
import { queryKeys } from "../reactQuery/queryConstants";
import ImageComponent from "./../commom/Image";
import { serverUrl } from "../reactQuery/queryUrl";
import { queryClient } from "../reactQuery/queryClient";
import { fetchPokemons, fetchSearchPokemon } from "./fetchPokemon";

export const deep_value = function (obj, path) {
  for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
    obj = obj[path[i]];
  }
  return obj;
};

export const isPokemonQueryEnabled = (debouncedInputValue, searchCategory) =>
  debouncedInputValue && searchCategory ? false : true;

export const getPokemonImageUrl = (sprites) =>
  sprites.front_default ||
  sprites.versions["generation-viii"].icons.front_default ||
  sprites.other["official-artwork"].front_default;

export const getPokemonArtWork = (sprites) => 
sprites.other["official-artwork"].front_default ||
sprites.versions["generation-viii"].icons.front_default 

export const querySearchPokemonKeys = (
  searchCategory,
  actualSearchCategory,
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
    actualSearchCategory,
    searchCategory,
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
  base_experience,
  held_items,
  sprites,
  stats,
}, {
  base_happiness,
  gender_rate,
  capture_rate,
  egg_groups,
  habitat
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
    url: getPokemonImageUrl(sprites),
    ImageComponent: (
      <ImageComponent
        url={getPokemonImageUrl(sprites)}
        className="h-[60px] w-[60px]"
        alt={name}
      />
    ),
    id,
    height,
    held_items,
    base_experience,
    base_happiness,
    gender_rate,
    capture_rate,
    egg_groups,
    habitat,
    sprites,
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

export const findPagePrefetchIndex = ({
  pageIndex,
  pageCount,
  searchOption,
  debouncedInputValue,
  pageSize,
}) => {
  const nextPage = pageIndex + 1;
  const previousPage = pageIndex - 1;

  if (nextPage < pageCount) {
    return nextPage;
  }

  if (
    pageIndex > 0 &&
    !queryClient.getQueriesData(
      querySearchPokemonKeys(
        "type",
        searchOption,
        debouncedInputValue,
        previousPage * pageSize,
        pageSize
      )
    ).length !== 0
  ) {
    return previousPage;
  }
};

export const cacheImages = async (srcArray, srcPath) => {
  try {
    const promises = await srcArray.map((item) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = srcPath ? deep_value(item, srcPath) : item;
        img.onload = () => {
          return resolve();
        };
        img.onerror = () => reject();
      });
    });
    await Promise.all(promises);
  } catch (error) {
    return;
  }
};

export const prefetchPokemonDataFn = async ({
  pageIndex,
  searchOption,
  debouncedInputValue,
  pageSize,
  pokemonsCtx,
  isSearch,
}) => {
  try {
    if (isSearch) {
      const resultData = await queryClient.fetchQuery(
        querySearchPokemonKeys(
          searchOption,
          searchOption,
          debouncedInputValue,
          pageIndex * pageSize,
          pageSize
        ),
        () =>
          fetchSearchPokemon(
            searchOption,
            debouncedInputValue,
            pokemonsCtx,
            pageIndex * pageSize,
            pageSize
          )
      );

      const url = resultData.pokemons.map((pokemon) => pokemon.url);
      cacheImages(url);
    }

    if (!isSearch) {
      const queryKey = [queryKeys.pokemons, pageIndex, pageSize];

      const resultData = await queryClient.fetchQuery(queryKey, () =>
        fetchPokemons(pageSize, pageIndex * pageSize, pokemonsCtx)
      );

      const url = resultData.pokemons.map((pokemon) => pokemon.url);
      cacheImages(url);
    }
  } catch (error) {
  return
  }
};

export const needUpdatePageIndex = (
  searchOption,
  previousValues,
  debouncedInputValue
) => {
  if (
    previousValues.current.searchOption === "" &&
    debouncedInputValue &&
    (searchOption === "type" ||
      searchOption === "name" ||
      searchOption === "ability")
  ) {
    return true;
  }
  if (
    previousValues.current.searchOption === searchOption &&
    searchOption !== "" &&
    previousValues.current.debouncedInputValue !== debouncedInputValue
  ) {
    return true;
  }
  if (
    previousValues.current.searchOption === "type" &&
    (searchOption === "name" || searchOption === "ability")
  ) {
    return true;
  }
  if (
    previousValues.current.searchOption === "name" &&
    (searchOption === "type" || searchOption === "ability")
  ) {
    return true;
  }
  if (
    previousValues.current.searchOption === "ability" &&
    (searchOption === "type" || searchOption === "name")
  ) {
    return true;
  }
  if (
    (previousValues.current.searchOption === "ability" ||
      previousValues.current.searchOption === "name" ||
      previousValues.current.searchOption === "type") &&
    searchOption === ""
  ) {
    return true;
  }
  return false;
};

export const validationPagination = (type, table) => {
  const validation = {
    lastPage:  table.getCanNextPage,
    previousPage:  table.getCanPreviousPage,
    nextPage: table.getCanNextPage,
    firstPage:   table.getCanPreviousPage
   } 

return validation[type]()
   
}

export const getPaginationAction = (action, table) => {
  const actions = {
    firstPage: () => table.setPageIndex(0),
    previousPage: () => table.previousPage(),
    nextPage: () => table.nextPage(),
    lastPage: () => table.setPageIndex(table.getPageCount() - 1)
  };

  return validationPagination(action, table) ? actions[action]() : null

};

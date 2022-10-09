import {
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
} from "../lib/pokemonFn";

function useDataEnabled(
  { actualCategoryValue, debouncedInputValue },
  data,
  loading
) {

  if (isPokemonQueryEnabled(debouncedInputValue)) {
    return { data: data.normalData, isLoading: loading.isLoadingDataPokemon };
  }
  if (
    isPokemonSearchEnabled(actualCategoryValue, "name", debouncedInputValue)
  ) {
    return {
      data: data.dataName,
      isLoading: loading.isLoadingPokemonNameSearch,
    };
  }
  if (
    isPokemonSearchEnabled(actualCategoryValue, "type", debouncedInputValue)
  ) {
    return {
      data: data.dataType,
      isLoading: loading.isLoadingPokemonTypeSearch,
    };
  }
}

export default useDataEnabled;

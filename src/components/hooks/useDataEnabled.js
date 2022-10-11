import {
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
} from "../lib/pokemonFn";

function useDataEnabled(
  { actualCategoryValue, debouncedInputValue },
  data,
  loading
) {


  if (isPokemonQueryEnabled(debouncedInputValue, actualCategoryValue)) {
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

  if (
    isPokemonSearchEnabled(actualCategoryValue, "ability", debouncedInputValue)
  ) {
    return {
      data: data.dataAbility,
      isLoading: loading.isLoadingPokemonAbilitySearch,
    };
  }
}

export default useDataEnabled;

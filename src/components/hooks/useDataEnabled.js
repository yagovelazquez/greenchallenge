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
    return { data: data.normalData, isLoading: loading.isLoadingDataPokemon,   queryEnabled: "normal", };
  }
  if (
    isPokemonSearchEnabled(actualCategoryValue, "name", debouncedInputValue)
  ) {
    return {
      data: data.dataName,
      isLoading: loading.isLoadingPokemonNameSearch,
      queryEnabled: "name",
    };
  }
  if (
    isPokemonSearchEnabled(actualCategoryValue, "type", debouncedInputValue)
  ) {
    return {
      data: data.dataType,
      isLoading: loading.isLoadingPokemonTypeSearch,
      queryEnabled: "type",
    };
  }

  if (
    isPokemonSearchEnabled(actualCategoryValue, "ability", debouncedInputValue)
  ) {
    return {
      data: data.dataAbility,
      isLoading: loading.isLoadingPokemonAbilitySearch,
      queryEnabled: "ability",
    };
  }
}

export default useDataEnabled;

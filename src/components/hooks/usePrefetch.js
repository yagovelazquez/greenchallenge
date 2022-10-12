import { useEffect } from "react";
import { prefetchPokemonDataFn } from "../lib/pokemonFn";
import { useContext } from "react";
import PokemonsContext from "../store/pokemonsProvider";
import { querySearchPokemonKeys } from "../lib/pokemonFn";
import { queryClient } from "../reactQuery/queryClient";
import { queryKeys } from "../reactQuery/queryConstants";

function usePrefetch({
  pageIndex,
  pageCount,
  searchOption,
  debouncedInputValue,
  pageSize,
  enabled,
}) {
  const pokemonsCtx = useContext(PokemonsContext);

  useEffect(() => {
    const nextPage = pageIndex + 1;
    const previousPage = pageIndex - 1;
    const prefetchSearchOptions = {
      searchOption,
      debouncedInputValue,
      pageSize,
      pokemonsCtx,
      isSearch: true,
    };

    const prefetchNormalOptions = {
      pageSize,
      pokemonsCtx,
      isSearch: false,
    };

    const prefetchCondition = (pageIndex, prefetchDirection, isSearch) => {
      let condition;
      let queryKey;
      if (prefetchDirection === "next") {
        condition = nextPage < pageCount;
      }

      if (prefetchDirection === "previous") {
        condition = pageIndex > 0;
      }

      queryKey = [queryKeys.pokemons, pageIndex, pageSize];

      if (isSearch) {
        queryKey = querySearchPokemonKeys(
          searchOption,
          searchOption,
          debouncedInputValue,
          pageIndex * pageSize,
          pageSize
        );
      }

      const data = queryClient.getQueryData(queryKey);
      return !data && condition ? true : false;
    };

    if (enabled.queryEnabled === "normal") {
      if (prefetchCondition(nextPage, "next")) {
        prefetchPokemonDataFn({
          pageIndex: nextPage,
          ...prefetchNormalOptions,
        });
      }

      if (prefetchCondition(previousPage, "previous")) {
        prefetchPokemonDataFn({
          pageIndex: previousPage,
          ...prefetchNormalOptions,
        });
      }
    }

    if (
      (enabled.queryEnabled === "type" || enabled.queryEnabled === "ability") &&
      debouncedInputValue
    ) {
      if (prefetchCondition(nextPage, "next", true)) {
        prefetchPokemonDataFn({
          pageIndex: nextPage,
          ...prefetchSearchOptions,
        });
      }

      if (prefetchCondition(previousPage, "previous", true)) {
        prefetchPokemonDataFn({
          pageIndex: previousPage,
          ...prefetchSearchOptions,
        });
      }
    }
  }, [
    pageIndex,
    pageCount,
    enabled.queryEnabled,
    debouncedInputValue,
    pokemonsCtx,
    searchOption,
    pageSize,
  ]);
  return;
}

export default usePrefetch;

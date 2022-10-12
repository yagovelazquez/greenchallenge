import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { queryKeys } from "../reactQuery/queryConstants";
import { fetchPokemons } from "../lib/fetchPokemon";
import TableComponent from "./../commom/Table";
import Select from "../commom/Select";
import {
  findPagePrefetchIndex,
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
  querySearchPokemonKeys,
} from "../lib/pokemonFn";
import { fetchSearchPokemon } from "./../lib/fetchPokemon";
import { useContext } from "react";
import PokemonsContext from "../store/pokemonsProvider";
import useDataEnabled from "./../hooks/useDataEnabled";
import DebouncedInput from "../commom/DebouncedInput";
import { getPokemonColumns } from "../lib/tableColumns";
import { queryClient } from "../reactQuery/queryClient";
import usePrefetch from "./../hooks/usePrefetch";

function PokemonHome() {
  const pokemonsCtx = useContext(PokemonsContext);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [searchOption, setSearchOption] = React.useState("");

  const searchOptionsHandler = (e) => {
    setSearchOption(e.target.value);
  };

  const { data: dataPokemon, isLoading: isLoadingDataPokemon } = useQuery(
    [queryKeys.pokemons, pageIndex, pageSize],
    () => fetchPokemons(pageSize, pageIndex * pageSize, pokemonsCtx),
    {
      enabled: isPokemonQueryEnabled(debouncedInputValue, searchOption),
    }
  );

  const { data: dataPokemonTypeSearch, isLoading: isLoadingPokemonTypeSearch } =
    useQuery(
      querySearchPokemonKeys(
        searchOption,
        "type",
        debouncedInputValue,
        pageIndex * pageSize,
        pageSize
      ),
      () =>
        fetchSearchPokemon(
          "type",
          debouncedInputValue,
          pokemonsCtx,
          pageIndex * pageSize,
          pageSize
        ),
      {
        enabled: isPokemonSearchEnabled(
          searchOption,
          "type",
          debouncedInputValue
        ),
        onSuccess: (data) => {},
        onError: (error, query) => {},
      }
    );

  const {
    data: dataPokemonAbilitySearch,
    isLoading: isLoadingPokemonAbilitySearch,
  } = useQuery(
    querySearchPokemonKeys(
      searchOption,
      "ability",
      debouncedInputValue,
      pageIndex * pageSize,
      pageSize
    ),
    () =>
      fetchSearchPokemon(
        "ability",
        debouncedInputValue,
        pokemonsCtx,
        pageIndex * pageSize,
        pageSize
      ),
    {
      enabled: isPokemonSearchEnabled(
        searchOption,
        "ability",
        debouncedInputValue
      ),
      onSuccess: (data) => {},
      onError: (error, query) => {},
    }
  );

  const { data: dataPokemonNameSearch, isLoading: isLoadingPokemonNameSearch } =
    useQuery(
      querySearchPokemonKeys(searchOption, "name", debouncedInputValue),
      () => fetchSearchPokemon("name", debouncedInputValue, pokemonsCtx),
      {
        enabled: isPokemonSearchEnabled(
          searchOption,
          "name",
          debouncedInputValue
        ),
        onSuccess: (data) => {},
        onError: (error, query) => {},
      }
    );

  const enabled = useDataEnabled(
    { debouncedInputValue, actualCategoryValue: searchOption },
    {
      dataName: dataPokemonNameSearch,
      dataType: dataPokemonTypeSearch,
      normalData: dataPokemon,
      dataAbility: dataPokemonAbilitySearch,
    },
    {
      isLoadingPokemonNameSearch,
      isLoadingDataPokemon,
      isLoadingPokemonAbilitySearch,
      isLoadingPokemonTypeSearch,
    }
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const columns = React.useMemo(() => getPokemonColumns(), []);
  const pageCount = Math.ceil(enabled?.data?.count / pageSize);

  usePrefetch({
    pageIndex,
    pageCount,
    searchOption,
    debouncedInputValue,
    pageSize,
    enabled,
  });

  const searchOptions = [
    { label: "Type", value: "type" },
    { label: "Ability", value: "ability" },
    { label: "Name", value: "name" },
  ];

  const debounceValueChangeHandler = React.useCallback(
    (value) => setDebouncedInputValue(String(value)),
    []
  );

  return (
    <div>
      <Select
        options={searchOptions}
        onChange={searchOptionsHandler}
        selectValue={searchOption}
        firstOption="Select a category"
      />
      <DebouncedInput
        value={""}
        onChange={debounceValueChangeHandler}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
        searchOption={searchOption}
      />
      {enabled?.isLoading ? (
        "Loading..."
      ) : (
        <TableComponent
          data={enabled?.data?.pokemons || []}
          pageCount={pageCount}
          columns={columns}
          onSetPagination={setPagination}
          pagination={pagination}
          debouncedInputValue={debouncedInputValue}
        />
      )}
      <ReactQueryDevtools />
    </div>
  );
}

export default PokemonHome;

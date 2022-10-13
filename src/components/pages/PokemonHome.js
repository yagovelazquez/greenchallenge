import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useRef } from "react";
import { queryKeys } from "../reactQuery/queryConstants";
import { fetchPokemons } from "../lib/fetchPokemon";
import TableComponent from "./../commom/Table";
import Select from "../commom/Select";
import {
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
  needUpdatePageIndex,
  querySearchPokemonKeys,
} from "../lib/pokemonFn";
import { fetchSearchPokemon } from "./../lib/fetchPokemon";
import { useContext } from "react";
import PokemonsContext from "../store/pokemonsProvider";
import useDataEnabled from "./../hooks/useDataEnabled";
import DebouncedInput from "../commom/DebouncedInput";
import { getPokemonColumns } from "../lib/tableColumns";
import usePrefetch from "./../hooks/usePrefetch";
import LoadingSpinner from "../commom/LoadingSpinner";
import Modal from "./../commom/Modal";

function PokemonHome() {
  const pokemonsCtx = useContext(PokemonsContext);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [searchOption, setSearchOption] = React.useState("");

  const searchOptionsHandler = (e) => {
    setSearchOption(e.value);
  };

  const previousValues = useRef({ searchOption, debouncedInputValue });

  useEffect(() => {
    if (
      needUpdatePageIndex(
        searchOption,
        previousValues,
        debouncedInputValue,
        pageIndex
      )
    ) {
      setPagination((prevValue) => {
        previousValues.current.searchOption = searchOption;
        previousValues.current.debouncedInputValue = debouncedInputValue;
        return { ...prevValue, pageIndex: 0 };
      });
    }
  }, [searchOption, debouncedInputValue, pageIndex]);

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

  const pageSizeTableValues = React.useMemo(
    () => [
      { value: 5, label: "Show 5" },
      { value: 10, label: "Show 10" },
      { value: 15, label: "Show 15" },
      { value: 20, label: "Show 20" },
      { value: 30, label: "Show 30" },
    ],
    []
  );

  const columns = React.useMemo(() => getPokemonColumns(), []);
  const pageCount = Math.ceil(enabled?.data?.count / pageSize);
  const pageMaxCount = Math.ceil(
    enabled?.data?.count / pageSizeTableValues[0].value
  );

  const dropDownValues = React.useMemo(
    () => [
      { value: "", label: "All" },
      { value: "normal", label: "Normal" },
      { value: "fire", label: "Fire" },
      { value: "water", label: "Water" },
      { value: "grass", label: "Grass" },
      { value: "electric", label: "Electric" },
      { value: "ice", label: "Ice" },
      { value: "fighting", label: "Fighting" },
      { value: "poison", label: "Poison" },
      { value: "ground", label: "Ground" },
      { value: "flying", label: "Flying" },
      { value: "psychic", label: "Psychic" },
      { value: "bug", label: "Bug" },
      { value: "rock", label: "Rock" },
      { value: "ghost", label: "Ghost" },
      { value: "dark", label: "Dark" },
      { value: "dragon", label: "Dragon" },
      { value: "steel", label: "Steel" },
      { value: "fairy", label: "Fairy" },
    ],
    []
  );

  usePrefetch({
    pageIndex,
    pageCount,
    searchOption,
    debouncedInputValue,
    pageSize,
    enabled,
  });

  const searchOptions = [
    { label: "Select a search category", value: "" },
    { label: "Type", value: "type" },
    { label: "Ability", value: "ability" },
    { label: "Name", value: "name" },
  ];

  const debounceValueChangeHandler = React.useCallback(
    (value) => setDebouncedInputValue(String(value)),
    []
  );

  const searchServerSelectProps = {
    options: searchOptions,
    onChange: searchOptionsHandler,
    selectValue: searchOption,
    placeholder: "Select a search category",
    width: "207px",
  };

  return (
    <div>
      <Modal isModal={enabled.isLoading}> <LoadingSpinner /></Modal> 
      <TableComponent
        data={enabled?.data?.pokemons || []}
        pageCount={pageCount}
        isLoading={enabled.isLoading}
        dropDownValues={dropDownValues}
        columns={columns}
        searchOption={searchOption}
        onDebounceValueChange={debounceValueChangeHandler}
        onSetPagination={setPagination}
        pagination={pagination}
        debouncedInputValue={debouncedInputValue}
        pageSizeTableValues={pageSizeTableValues}
        pageMaxCount={pageMaxCount}
        searchServerSelectProps={searchServerSelectProps}
      />
    </div>
  );
}

export default PokemonHome;

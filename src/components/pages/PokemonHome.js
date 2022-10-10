import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { serverUrl } from "../reactQuery/queryUrl";
import React, { useEffect } from "react";
import { queryKeys } from "../reactQuery/queryConstants";
import {
  getPokemons,
  getPokemonInfo,
  fetchPokemons,
} from "../lib/fetchPokemon";
import PokemonTypes from "../commom/PokemonTypes";
import TableComponent from "./../commom/Table";
import Select from "../commom/Select";
import {
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
  querySearchPokemonKeys,
} from "../lib/pokemonFn";
import { fetchSearchPokemon } from "./../lib/fetchPokemon";
import { useContext } from "react";
import PokemonTypesContext from "../store/pokemonTypesProvider";
import useDataEnabled from "./../hooks/useDataEnabled";
import DebouncedInput from "../commom/DebouncedInput";

function PokemonHome() {
  const pokemonTypesCtx = useContext(PokemonTypesContext);
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
    () => fetchPokemons(pageSize, pageIndex * pageSize),
    {
      enabled: isPokemonQueryEnabled(debouncedInputValue, searchOption),
    }
  );

  const { data: dataPokemonTypeSearch, isLoading: isLoadingPokemonTypeSearch } =
    useQuery(
      querySearchPokemonKeys(
        "type",
        searchOption,
        debouncedInputValue,
        pageIndex * pageSize,
        pageSize
      ),
      () =>
        fetchSearchPokemon(
          "type",
          debouncedInputValue,
          pageIndex * pageSize,
          pageSize,
          pokemonTypesCtx
        ),
      {
        enabled: isPokemonSearchEnabled(
          searchOption,
          "type",
          debouncedInputValue
        ),
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error, query) => {
          console.log(query);
        },
      }
    );

  const { data: dataPokemonNameSearch, isLoading: isLoadingPokemonNameSearch } =
    useQuery(
      querySearchPokemonKeys("name", searchOption, debouncedInputValue),
      () => fetchSearchPokemon("name", debouncedInputValue),
      {
        enabled: isPokemonSearchEnabled(
          searchOption,
          "name",
          debouncedInputValue
        ),
        onSuccess: (data) => {

        },
        onError: (error, query) => {
          
        },
      }
    );

  const enabled = useDataEnabled(
    { debouncedInputValue, actualCategoryValue: searchOption },
    {
      dataName: dataPokemonNameSearch,
      dataType: dataPokemonTypeSearch,
      normalData: dataPokemon,
    },
    {
      isLoadingPokemonNameSearch,
      isLoadingDataPokemon,
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

  function multiSelectFilter(rows, columnId, filterValue) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row) =>
          filterValue.includes(String(row.original[columnId]))
        );
  }

  const columns = [
    {
      accessorKey: "image",
      header: "",
      cell: (info) => info.getValue(),
      filter: multiSelectFilter,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
      filter: multiSelectFilter,
    },
    {
      accessorKey: "height",
      header: "Height",
      cell: (info) => info.getValue(),
      filter: multiSelectFilter,
    },
    {
      accessorKey: "typeComponent",
      header: "Type",
      cell: (info) => info.getValue(),
      filter: multiSelectFilter,
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: (info) => info.getValue(),
      filter: multiSelectFilter,
    },
  ];

  const pageCount = Math.ceil(enabled?.data?.count / pageSize);

  const searchOptions = [
    { label: "Type", value: "type" },
    { label: "Attributes", value: "attributes" },
    { label: "Name", value: "name" },
  ];



  return (
    <div>
      <Select
        options={searchOptions}
        onChange={searchOptionsHandler}
        selectValue={searchOption}
      />
      <DebouncedInput
        value={""}
        onChange={(value) => setDebouncedInputValue(String(value))}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
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

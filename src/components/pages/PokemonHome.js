import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { queryKeys } from "../reactQuery/queryConstants";
import { fetchPokemons } from "../lib/fetchPokemon";
import TableComponent from "./../commom/Table";
import Select from "../commom/Select";
import {
  isPokemonQueryEnabled,
  isPokemonSearchEnabled,
  querySearchPokemonKeys,
} from "../lib/pokemonFn";
import { fetchSearchPokemon } from "./../lib/fetchPokemon";
import { useContext } from "react";
import PokemonsContext from "../store/pokemonsProvider";
import useDataEnabled from "./../hooks/useDataEnabled";
import DebouncedInput from "../commom/DebouncedInput";

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
          pokemonsCtx
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

  const columns = [
    {
      accessorKey: "image",
      header: "",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "abilitiesComponent",
      header: "Abilities",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "typeComponent",
      header: "Type",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "height",
      header: "Height",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      header: "Stats",
      columns: [
        {
          accessorKey: "hp",
          header: "Hp",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "attack",
          header: "Atk",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "defense",
          header: "Def",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-attack",
          header: "S.Atk",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-defense",
          header: "S.Def",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "speed",
          header: "Spd",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
      ],
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
        firstOption="Select a category"
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

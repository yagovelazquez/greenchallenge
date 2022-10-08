import { useQuery } from "@tanstack/react-query";
import { serverUrl } from "../reactQuery/queryUrl";
import React from "react";
import { queryKeys } from "../reactQuery/queryConstants";
import {
  getPokemons,
  getPokemonInfo,
  fetchPokemons,
} from "../lib/fetchPokemon";
import PokemonTypes from "../commom/PokemonTypes";
import TableComponent from './../commom/Table';

function PokemonHome() {
  const { data, isLoading } = useQuery([queryKeys.pokemons], () =>
    fetchPokemons(50, 0)
  );

  const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
       
      },
      {
        accessorKey: "height",
        header: "Height",
        cell: (info) => info.getValue(),
   
      },
      {
        accessorKey: "typeComponent",
        header: "Type",
        cell: (info) => info.getValue(),
   
      }
  ];



  console.log(data)

  return <div>{isLoading ? "Loading..." : <TableComponent data={data} columns={columns} />}</div>;
}

export default PokemonHome;

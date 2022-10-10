import React from "react";
import Select from "./Select";
import DebouncedInput from "./DebouncedInput";
import { useContext } from "react";
import PokemonTypesContext from "../store/pokemonTypesProvider";

function DropdownColumnFilter({ column, table, dropDownValues }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const setColumnFilterValueHandler = (e) => {
    return column.setFilterValue(e.target.value);
  };

  return (
    <>
      <Select
        options={dropDownValues}
        onChange={setColumnFilterValueHandler}
        selectValue={columnFilterValue}
      ></Select>
    </>
  );
}

export default DropdownColumnFilter;

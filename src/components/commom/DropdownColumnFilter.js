import React from "react";
import Select from "./Select";

function DropdownColumnFilter({ column, table, dropDownValues }) {
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

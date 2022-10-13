import {
  MdChevronRight,
  MdChevronLeft,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md";
import { getPaginationAction } from "../lib/pokemonFn";
import PaginationArrow from "./PaginationArrow";
import Select from "./Select";
import { useState } from "react";

function PaginationController({ table, pageSizeTableValues }) {
  const pageSize = table.getState().pagination.pageSize;

  const value = {
    value: pageSize,
    label: `Show ${pageSize}`,
  };

  return (
    <div className="flex tablet:my-6 my-4 justify-between flex-col tablet:flex-row gap-4 tablet:gap-0 items-center w-full max-w-[750px]">
      <div className="flex gap-3 w-full tablet:w-auto justify-start md:justify-center">
        <span className="flex items-center  gap-1 text-xl tablet:text-base font-medium font-garamond">
          <div>Page</div>
          <strong> {table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong> {table.getPageCount()}</strong>
        </span>
        <Select
          options={pageSizeTableValues}
          value={value}
          isSearchable={false}
          width="100%"
          onChange={(e) => {
            table.setPageSize(Number(e.value));
          }}
        ></Select>
      </div>
      <div className="flex gap">
        <PaginationArrow table={table} type="firstPage" Icon={MdFirstPage} />
        <PaginationArrow
          table={table}
          type="previousPage"
          Icon={MdChevronLeft}
        />
        <PaginationArrow table={table} type="nextPage" Icon={MdChevronRight} />
        <PaginationArrow table={table} type="lastPage" Icon={MdLastPage} />
      </div>
    </div>
  );
}

export default PaginationController;

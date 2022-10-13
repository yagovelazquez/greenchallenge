import * as React from "react";
import DebouncedInput from "./DebouncedInput";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  GroupingState,
  useReactTable,
  sortingFns,
} from "@tanstack/react-table";

import { compareItems } from "@tanstack/match-sorter-utils";
import { setTypeIcon } from "./../lib/setTypeIcon";
import Select from "./Select";
import PaginationController from "./PaginationController";

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function Table({
  columns,
  data,
  onSetPagination,
  pagination,
  searchOption,
  onDebounceValueChange,
  searchServerSelectProps,
  pageCount,
  pageSizeTableValues,
  pageMaxCount,
  dropDownValues,
  isLoading,
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [grouping, setGrouping] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility: { types: false },
      pagination,
      grouping,
      sorting,
      columnFilters,
    },
    pageCount: pageCount,
    onGroupingChange: setGrouping,
    onPaginationChange: onSetPagination,
    manualPagination: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const strippedFuncClass = (index) =>
    index % 2 === 0 ? "bg-gray-100" : "bg-white";

  const columnType = table.getColumn("types");

  return (
    <div className="p-2 bg-gray-200 flex items-center  flex-col">
      <div className="mb-6 flex justify-start w-[750px] items-center gap-4">
        <DebouncedInput
          value={""}
          onChange={onDebounceValueChange}
          className="p-2 font-lg shadow border border-block rounded h-[38px] focus:outline-none font-garamond font-medium placeholder:text-[rgb(128,128,128)]"
          placeholder="Search all columns..."
          searchOption={searchOption}
        />

        <Select {...searchServerSelectProps} />

        <span className="ml-auto font-garamond font-medium text-md">
          Filter:{" "}
        </span>
        <Select
          onChange={(e) => {
            return columnType.setFilterValue(e.value);
          }}
          width="120px"
          defaultValue={dropDownValues[0]}
          selectValue={columnType.getFilterValue()}
          options={dropDownValues}
        />
      </div>
      <table className="w-[750px] bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={` h-[30px] bg-white text-left py-5 border-gray-300 tracking-widest uppercase text-xs font-normal border-b ${header.column.columnDef.thClassName}`}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              className={`${strippedFuncClass(index)}  h-[60px]`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={`${cell.column.columnDef.tdClassName} capitalize border-gray-300 border-b  font-garamond text-sm font-medium`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {table.getPrePaginationRowModel().rows.length === 0 &&
        columnFilters.length === 0 &&
        !isLoading && <p>No pokemon matched your search!</p>}
      {
        table.getPrePaginationRowModel().rows.length === 0 &&
        columnFilters.length > 0 &&
        !isLoading &&
      <p>No pokemon matched your filter in this page!</p>}

      {pageMaxCount > 1 && (
        <PaginationController
          table={table}
          pageSizeTableValues={pageSizeTableValues}
        />
      )}
    </div>
  );
}

export default Table;

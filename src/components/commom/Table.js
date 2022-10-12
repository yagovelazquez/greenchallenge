import * as React from "react";

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
import DropdownColumnFilter from "./DropdownColumnFilter";
import { setTypeIcon } from "./../lib/setTypeIcon";

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
  pageCount,
  pageSizeTableValues,
  pageMaxCount,
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
    index % 2 !== 0 ? "bg-gray-100 border-b" : "bg-white border-b";

  const dropDownValues = [
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
  ];

  const processedDropDownValues = dropDownValues.map((value) => {
    return { ...value, Icon: setTypeIcon(value.value) };
  });

  return (
    <div className="p-2">
      <div>
        <DropdownColumnFilter
          dropDownValues={processedDropDownValues}
          variant="icon"
          column={table.getColumn("types")}
          table={table}
        />
      </div>
      <table className="min-w-[450px] border-2 bg-gray-200 border-b-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
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
                  className={
                    index !== 2 ? `capitalize text-left px-[10px]` : `text-left`
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      {table.getPrePaginationRowModel().rows.length === 0 &&
        columnFilters.length === 0 && <p>No pokemon matched your search!</p>}
      {table.getPrePaginationRowModel().rows.length === 0 &&
        columnFilters.length > 0 && (
          <p>No pokemon matched your filter in this page!</p>
        )}

      {pageMaxCount > 1 && (
        <>
          <div className="h-4" />
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {pageSizeTableValues.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default Table;

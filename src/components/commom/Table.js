import * as React from "react";
import DebouncedInput from "./DebouncedInput";

import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
  sortingFns,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import DropdownColumnFilter from "./DropdownColumnFilter";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

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
  onDebouncedInputValue,
  debouncedInputValue,
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility: { types: false },
      pagination,
      columnFilters,
    },
    pageCount: pageCount,
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onPaginationChange: onSetPagination,
    manualPagination: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const strippedFuncClass = (index) =>
    index % 2 !== 0 ? "bg-gray-100 border-b" : "bg-white border-b";

  const dropDownValues = [
    {value: "all", label: "All"},
    {value: "normal", label: "Normal"},
    {value: "fire", label: "Fire"},
    {value:"water", label: "Water"},
    {value:"grass", label: "Grass"},
    {value:"electric", label: "Electric"},
   {value: "ice" , label: "Ice"},
    {value:"fighting", label: "Fighting"},
    {value:"poison", label: "Poison"},
    {value:"ground", label: "Ground"},
   { value:"flying", label: "Flying"},
    {value:"psychic", label: "Psychic"},
   { value:"bug",label: "Bug" },
    {value:"rock",label: "Rock" },
    {value:"ghost", label: "Ghost"},
    {value:"dark",label: "Dark"},
    {value:"dragon",label: "Dragon"},
    {value:"steel",label: "steel"},
    {value:"fairy",label: "Fairy" },
  ];

  return (
    <div className="p-2">
      <div>
      <DropdownColumnFilter dropDownValues={dropDownValues} column={table.getColumn("types")} table={table} />
      </div>
      <table className="min-w-[450px] border-2 bg-gray-200 border-b-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b-2 text-left h-[60px]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-[10px]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
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

      {table.getPageCount() > 1 && (
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
            {[5, 10, 15, 20, 30].map((pageSize) => (
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

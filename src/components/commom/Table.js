import * as React from "react";
import DebouncedInput from "./DebouncedInput";
import { useContext } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import TableCard from "./TableCard";
import ModalContext from "../store/modalProvider";
import Select from "./Select";
import PaginationController from "./PaginationController";
import TableMessage from "./TableMessage";

function Table({
  columns,
  data,
  onSetPagination,
  pagination,
  searchOption,
  messages,
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
  const modalCtx = useContext(ModalContext);

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
  const validationData = {
    table,
    columnFilters,
    isLoading,
  };

  return (
    <div className="p-8  flex items-center 	    flex-col">
      <div className="w-full max-w-[750px] tablet:m-10 m-4  ">
        <div className="tablet:mb-6 flex justify-between w-full max-w-[750px] flex-wrap items-center gap-4">
          <div className="flex tablet:flex-row flex-col-reverse w-full tablet:w-auto gap-4">
            <DebouncedInput
              value={""}
              onChange={onDebounceValueChange}
              className="p-2 font-lg shadow border tablet:text-base text-lg w-full tablet:w-auto  border-block rounded h-[42px] tablet:h-[38px] focus:outline-none font-garamond font-medium placeholder:text-[rgb(128,128,128)]"
              placeholder="Search a pokémon"
              searchOption={searchOption}
            />

            <Select {...searchServerSelectProps} />
          </div>

          <div className="flex items-center w-full tablet:w-auto justify-center gap-2">
            <span className="ml-auto font-garamond text-xl font-medium tablet:text-base">
              Filter:{" "}
            </span>
            <Select
              onChange={(e) => {
                return columnType.setFilterValue(e.value);
              }}
              width="100%"
              divStyles={
                "flex justify-center w-full tablet:w-[120px] tablet:text-base text-lg"
              }
              defaultValue={dropDownValues[0]}
              selectValue={columnType.getFilterValue()}
              options={dropDownValues}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full max-w-[750px] bg-white min-w-[610px] hidden tablet:block">
            <thead className="overflow-visible">
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
                                ? "cursor-pointer select-none flex gap-1  items-center"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <GoTriangleUp />,
                              desc: <GoTriangleDown />,
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
                      {!cell.column.columnDef.openPokemonInfo ? (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : (
                        <div className="hover:cursor-pointer underline-offset-4" onClick={() => modalCtx.onModal({isModal: true, data: cell.getContext().row.original})}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableMessage
          message={messages.search}
          type="search"
          validationData={validationData}
        />
        <TableMessage
          message={messages.filter}
          type="filter"
          validationData={validationData}
        />
        <TableCard data={table.getPrePaginationRowModel().rows} />
        {pageMaxCount > 1 &&
          table.getPrePaginationRowModel().rows.length > 0 && (
            <PaginationController
              table={table}
              pageSizeTableValues={pageSizeTableValues}
            />
          )}
      </div>
    </div>
  );
}

export default Table;

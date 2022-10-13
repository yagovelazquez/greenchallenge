import {
    MdChevronRight,
    MdChevronLeft,
    MdLastPage,
    MdFirstPage,
  } from "react-icons/md";
  import { getPaginationAction } from "../lib/pokemonFn";
import PaginationArrow from "./PaginationArrow";
  import Select from "./Select";


function PaginationController({table, pageSizeTableValues}) {
  return (
    <div className="flex my-6 justify-between items-center w-[750px]">
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-md font-medium font-garamond">
          <div>Page</div>
          <strong> {table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong> {table.getPageCount()}</strong>
        </span>
        <Select
          options={pageSizeTableValues}
          defaultValue={pageSizeTableValues[0]}
          value={table.getState().pagination.pageSize}
          isSearchable={false}
          width="120px"
          onChange={(e) => {
            table.setPageSize(Number(e.value));
          }}
        ></Select>
      </div>
      <div className="flex gap">
        <PaginationArrow table={table} type="firstPage" Icon={MdFirstPage} />
        <PaginationArrow table={table} type="previousPage" Icon={MdChevronLeft} />
        <PaginationArrow table={table} type="nextPage" Icon={MdChevronRight} />
        <PaginationArrow table={table} type="lastPage" Icon={MdLastPage} />
      </div>
    </div>
  );
}

export default PaginationController;

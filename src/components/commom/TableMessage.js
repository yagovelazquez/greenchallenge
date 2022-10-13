import { MdErrorOutline } from "react-icons/md";

function TableMessage({ type, validationData, message }) {
  const { table, columnFilters, isLoading } = validationData;

  const validation = {
    search: () =>
      table.getPrePaginationRowModel().rows.length === 0 &&
      columnFilters.length === 0 &&
      !isLoading,
    filter: () =>
      table.getPrePaginationRowModel().rows.length === 0 &&
      columnFilters.length > 0 &&
      !isLoading,
  };

  if (!validation[type]) console.log("Validation Type Incorrect");

  return validation[type]() ? (
    <div className="flex items-center justify-center gap-1 my-4 text-red">
            <MdErrorOutline size={20} />
      <span className="italic">
        {message}
      </span>
    </div>
  ) : null;
}

export default TableMessage;

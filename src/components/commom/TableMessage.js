import { MdErrorOutline } from "react-icons/md";

function TableMessage({ type, validationData, message, female }) {
  const validation = {
    pokemonWithoutSex: () => female < 0,
    search: () =>
      validationData.table.getPrePaginationRowModel().rows.length === 0 &&
      validationData.columnFilters.length === 0 &&
      !validationData.isLoading,
    filter: () =>
      validationData.table.getPrePaginationRowModel().rows.length === 0 &&
      validationData.columnFilters.length > 0 &&
      !validationData.isLoading,
  };

  if (!validation[type]) console.log("Validation Type Incorrect");

  return validation[type]() ? (
    <div className="flex items-center justify-center gap-1 my-4 text-red">
      <MdErrorOutline size={20} />
      <span className="italic">{message}</span>
    </div>
  ) : null;
}

export default TableMessage;

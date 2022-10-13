import { getPaginationAction } from "../lib/pokemonFn";

function PaginationArrow({ Icon, table, type }) {
  return (
    <div className="border-gray-300 border flex items-center  bg-white text-gray-400 h-7 w-7">
      <Icon
        onClick={() => getPaginationAction(type, table)}
        className="h-6 w-6"
      ></Icon>
    </div>
  );
}

export default PaginationArrow;

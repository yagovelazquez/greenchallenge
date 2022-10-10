import { setTypeIcon } from "../lib/setTypeIcon";

function PokemonTypes({types}) {

  const processedTypes = types?.map((typeData) => {
    const typeName = typeData.type.name;
    const TypeIcon = setTypeIcon(typeName);
    return { typeName, TypeIcon };
  });

  return (
    <ul className="list-none">
      {processedTypes.map(({ typeName, TypeIcon }) => (
        <li  key={typeName} className={`text-${typeName}-dark`}>
       <TypeIcon className={`inline mx-2 align-middle`}/><span value="typeName" className="capitalize align-middle">{typeName} </span>
        </li>
      ))}
    </ul>
  );
}

export default PokemonTypes;

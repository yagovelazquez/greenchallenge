import { setTypeIcon } from "../lib/setTypeIcon";

function List({ listItems, variant, styles }) {
  let processedItems;
  if (variant === "typeIcon") {
    processedItems = listItems?.map((typeData) => {
      const typeName = typeData.type.name;
      const TypeIcon = setTypeIcon(typeName);
      return { typeName, TypeIcon };
    });
  }

  if (variant === "abilitiesList") {
    processedItems = listItems?.map((abilityData) => {
      const abilityName = abilityData.ability.name;
      return abilityName;
    });
  }

  return (
    <ul className="list-none">
      {variant === "typeIcon" &&
        processedItems.map(({ typeName, TypeIcon }) => (
          <li key={typeName} className={`text-${typeName}-dark`}>
            <TypeIcon className={`inline mx-2 align-middle`} />
            <span value="typeName" className="capitalize align-middle">
              {typeName}{" "}
            </span>
          </li>
        ))}
      {variant === "abilitiesList" &&
        processedItems.map((ability) => (
          <li className={styles ? styles : "capitalize"} key={ability}>
            {ability}
          </li>
        ))}
    </ul>
  );
}

export default List;

import ImageComponent from "./../commom/Image";
import { getPokemonImageUrl } from "../lib/pokemonFn";
import List from "./List";

function TableCard({ data }) {
  function ItemList({ attribute, value, styles }) {
    return (
      <div
        className={
          styles
            ? styles
            : "justify-between w-full flex border-b border-gray-300"
        }
      >
        <span className="tracking-widest pr-4">{attribute}</span>
        <span className="tracking-normal italic font-garamond text-right text-lg capitalize">
          {value}
        </span>
      </div>
    );
  }

  function StatsList({ height, attack, defense, speed, sAttack, sDefense }) {
    const stats = [
      { attribute: "Height", value: height },
      { attribute: "Attack", value: attack },
      { attribute: "S.Attack", value: sAttack },
      { attribute: "Defense", value: defense },
      { attribute: "S.Defense", value: sDefense },
      { attribute: "Speed", value: speed },
    ];

    return (
      <div className="flex flex-col items-center">
        <span className="tracking-widest mx-auto">Stats</span>
        {stats.map((stat) => (
          <ItemList
            key={stat.attribute}
            attribute={stat.attribute}
            value={stat.value}
            styles="justify-between w-full flex"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {data.map((pokemon) => {
        const {
          url,
          name,
          abilities,
          typeComponent,
          height,
          attack,
          defense,
          speed,
          "special-attack": sAttack,
          "special-defense": sDefense,
        } = pokemon.original;

        return (
          <div
            key={name}
            className="tablet:hidden text-gray-600 p-4 pr-7 rounded-lg border flex-col shadow-md my-10 w-full min-h-[300px] bg-white border-gray-300"
          >
            <div className="flex align-center justify-center w-full  ">
              <ImageComponent
                url={url}
                className="min-h-[90px] max-h-[90px] max-w[90px] min-w-[80px] mr-4"
                alt={name}
              ></ImageComponent>
              <div className="justify-between flex-col w-full flex">
                <ItemList attribute="Name" value={name}></ItemList>
                <ItemList
                  attribute="Abilities"
                  value={
                    <List
                      listItems={abilities}
                      styles={"text-right capitalize"}
                      variant={"abilitiesList"}
                    />
                  }
                ></ItemList>
                <ItemList attribute="Types" value={typeComponent}></ItemList>
                <StatsList
                  height={height}
                  attack={attack}
                  sAttack={sAttack}
                  sDefense={sDefense}
                  speed={speed}
                  defense={defense}
                ></StatsList>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TableCard;

import Image from "./Image";
import { getPokemonArtWork } from "../lib/pokemonFn";
import { IoMdClose } from "react-icons/io";
import BarChart from "./BarChart";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import ModalContext from "../store/modalProvider";
import { useContext } from "react";
import TableMessage from './TableMessage';

const SubtitleChart = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-[#FFC0CB] mr-4 w-8 h-4"></div>{" "}
      <span className="mr-4">Female</span>
      <div className="bg-[#87CEFA] mr-4 w-8 h-4"></div> <span>Male</span>
    </div>
  );
};

function CardPokemonInfo() {
  const modalCtx = useContext(ModalContext);
  const data = modalCtx.modalState.data;

  if (data.length === 0) return;

  const url = getPokemonArtWork(data.sprites);

  const ListItems = ({ styles, value, attribute, unity }) => (
    <div className={styles ? styles : "flex flex-col w-1/3 items-center"}>
      <span className="tracking-widest not-italic font-medium font-sans ">
        {attribute}
      </span>
      <span className="tracking-normal text-center text-lg capitalize">
        {unity === "m" ? value / 10 : value}{" "}
        <span className="lowercase">{unity}</span>
      </span>
    </div>
  );

  const PokemonWithoutSex = ({female}) => {
    const message = "This pokemon doesn't have a defined sex."
    return <TableMessage type="pokemonWithoutSex" female={female} message={message} />
  }

  const GraficComponent = ({
    graphcomponent,
    label,
    stylesLabel,
    subtitleComponent,
  }) => (
    <div>
      <span
        className={`font-sans align-middle tracking-widest flex flex-col items-center font-medium my-3 not-italic ${stylesLabel}`}
      >
        {label}
      </span>
      <div className="h-[200px] ">{graphcomponent}</div>
      <div>{subtitleComponent}</div>
    </div>
  );
  const {
    "special-attack": specialAttack,
    attack,
    defense,
    "special-defense": specialDefense,
    hp,
    speed,
    base_experience,
    base_happiness,
    capture_rate,
  } = data;

  const barChartData = [
    { Points: base_experience, name: "Base Experience" },
    { Points: base_happiness, name: "Base Happiness" },
    { Points: capture_rate, name: "Capture Rate" },
  ];


  const radarData = [
    { Points: specialAttack, name: "Special Attack", fullMark: 150 },
    { Points: attack, name: "Attack", fullMark: 150 },
    { Points: defense, name: "Defense", fullMark: 150 },
    { Points: specialDefense, name: "Special Defense", fullMark: 150 },
    { Points: hp, name: "Hp", fullMark: 150 },
    { Points: speed, name: "Speed", fullMark: 150 },
  ];

  const female = (data?.gender_rate / 8) * 100;
  const male = 100 - female;
  const PierData = [
    { value: female, name: "Female" },
    { value: male, name: "Male" },
  ];


  return (
    <div className="flex flex-col justify-start   p-4 italic font-garamond">
      <div className="flex relative w-full items-center">
        <Image className="h-[150px] w-[150px]" url={url} alt={data.name} />
        <IoMdClose
          onClick={() => modalCtx.onModal(false)}
          className="absolute cursor-pointer h-6 w-6  top-2 right-2"
        />
        <div className="flex flex-col ">
          <span className="text-4xl capitalize p-4 ">{data.name}</span>
          <div className="flex w-full justify-center">
            <span className="font-sans align-middle tracking-widest font-medium my-auto not-italic ">
              Type{" "}
            </span>
            <span> {data.typeComponent}</span>
          </div>
        </div>
      </div>
      <div className="flex border-gray-400 border-b">
        {<ListItems value={data.height} unity="m" attribute="Height" />}
        {<ListItems value={data.abilitiesComponent} attribute="Abilities" />}
        {<ListItems value={data.weight} unity="kg" attribute="Weight" />}
      </div>
      <GraficComponent
        label="Misscellaneous Stats"
        graphcomponent={<BarChart data={barChartData} />}
      />
      <GraficComponent
        label="Stats"
        graphcomponent={<RadarChart data={radarData} />}
      />

      <GraficComponent
        label="Gender Ratio"
        stylesLabel="!my-1"
        subtitleComponent={female < 0 ? null :  <SubtitleChart />}
        graphcomponent={
          female < 0 ? <PokemonWithoutSex female={female}/> : 
          <PieChart COLORS={["#FFC0CB", "#87CEFA"]} data={PierData} />
        }
      />
    </div>
  );
}

export default CardPokemonInfo;

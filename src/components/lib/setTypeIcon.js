import { FaFistRaised } from "react-icons/fa";
import { BiCircle, BiGhost } from "react-icons/bi";
import {
  GiLibertyWing,
  GiPoisonBottle,
  GiStonePile,
  GiThreeLeaves,
  GiFluffySwirl,
  GiSpikedDragonHead,
  GiNightSky,
  GiFairyWand,
} from "react-icons/gi";
import { RiBuilding3Fill } from "react-icons/ri";
import { AiFillBug, AiFillThunderbolt } from "react-icons/ai";
import { CgShapeHexagon } from "react-icons/cg";
import { ImFire } from "react-icons/im";
import { IoWaterSharp } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";

export const setTypeIcon = (type) => {
  let Icon
  switch (type) {
    case "normal":
        Icon = BiCircle
      break;
    case "fighting":
        Icon = FaFistRaised
      break;
    case "flying":
        Icon = GiLibertyWing
      break;
    case "poison":
        Icon = GiPoisonBottle
      break;
    case "ground":
       Icon = RiBuilding3Fill 
      break;
    case "rock":
        Icon = GiStonePile
      break;
    case "bug":
        Icon = AiFillBug
      break;
    case "ghost":
        Icon = BiGhost
      break;
    case "steel":
        Icon = CgShapeHexagon
      break;
    case "fire":
        Icon = ImFire
      break;
    case "water":
        Icon = IoWaterSharp
      break;
    case "grass":
        Icon = GiThreeLeaves
      break;
    case "eletric":
        Icon = AiFillThunderbolt
      break;
    case "psychic":
        Icon = GiFluffySwirl
      break;
    case "ice":
        Icon = BsSnow
      break;
    case "dragon":
        Icon = GiSpikedDragonHead
      break;
    case "dark":
        Icon = GiNightSky
      break;
    case "fairy":
        Icon = GiFairyWand
      break;
    default:
        Icon = GiFairyWand
      break;
  }

  return Icon
};

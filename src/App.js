import PokemonHome from "./components/pages/PokemonHome";
import PokemonTypesProvider from "./components/store/pokemonTypes-context";
import ModalProvider from "./components/store/modal-context";
import PopUpModal from "./components/commom/PopUpModal";
import CardPokemonInfo from "./components/commom/CardPokemonInfo";

function App() {
  return (
    <PokemonTypesProvider>
      <ModalProvider>
        <PopUpModal ><CardPokemonInfo /></PopUpModal>
        <PokemonHome />
      </ModalProvider>
    </PokemonTypesProvider>
  );
}

export default App;

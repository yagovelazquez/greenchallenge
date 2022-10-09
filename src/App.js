import "./App.css";
import PokemonHome from "./components/pages/PokemonHome";
import PokemonTypesProvider from "./components/store/pokemonTypes-context";

function App() {
  return (
    <PokemonTypesProvider>
      <PokemonHome />
    </PokemonTypesProvider>
  );
}

export default App;

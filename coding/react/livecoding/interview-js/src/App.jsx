import { useState } from 'react';
import { PokemonList } from './components/pokemon/list/PokemonList';
import { PokemonDetail } from './components/pokemon/details/PokemonDetail';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    > * {
      width: 80%; // Los hijos ocupan todo el ancho en móvil
    }
  }
`;

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState();

  return (
    <MainContainer>
      <SubContainer>
        <PokemonList setSelectedPokemon={setSelectedPokemon}></PokemonList>
        <PokemonDetail selectedPokemon={selectedPokemon}></PokemonDetail>
      </SubContainer>
    </MainContainer>
  );
}

export default App;

import { memo } from 'react';
import { useFetch } from '../../../hooks/useSearchPokemon';
import CardStyle from '../../common/card/Card';
import styled from 'styled-components';

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: deepskyblue;
  border: 0;
  color: white;
  border-radius: 0.2rem;
  transition: background-color 1s;
  cursor: pointer;

  &:hover {
    background-color: navy;
  }
`;

export const PokemonList = memo(({ setSelectedPokemon }) => {
  const [result, loading, error] = useFetch({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=20',
  });

  const pokemons = result?.results;

  return (
    <CardStyle
      data={pokemons}
      loading={loading}
      loadingName={'pokemons'}
      error={error}
      emptyObject={'Please select a pokemon'}
    >
      {() => {
        return (
          <ButtonList>
            {pokemons?.map((pokemon) => (
              <Button
                role="button"
                aria-label={`Select pokemon ${pokemon.name}`}
                key={pokemon.name}
                onClick={() => setSelectedPokemon(pokemon)}
              >
                {pokemon.name}
              </Button>
            ))}
          </ButtonList>
        );
      }}
    </CardStyle>
  );
});

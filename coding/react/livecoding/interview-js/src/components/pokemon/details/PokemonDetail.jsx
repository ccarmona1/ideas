import styled from 'styled-components';
import { useFetch } from '../../../hooks/useSearchPokemon';
import CardStyle from '../../common/card/Card';

const DetailsSection = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const PokemonDetail = ({ selectedPokemon }) => {
  const [pokemon, loading, error] = useFetch({ url: selectedPokemon?.url });

  return (
    <CardStyle
      data={pokemon}
      loading={loading}
      loadingName={selectedPokemon?.name}
      error={error}
      emptyObject={'Please select a pokemon'}
    >
      {() => {
        return (
          <>
            <DetailsSection>
              <section>
                <img src={pokemon?.sprites.front_default}></img>
              </section>
              <section>
                <div>ID: {pokemon?.id}</div>
                <div>{pokemon?.name}</div>
                <div>Weight: {pokemon?.weight}</div>
              </section>
            </DetailsSection>

            <DetailsSection>
              <div>
                Ability 1: {(pokemon?.abilities[0] ?? {}).ability?.name}
              </div>
              <div>
                Ability 2: {(pokemon?.abilities[1] ?? {}).ability?.name}
              </div>
            </DetailsSection>
          </>
        );
      }}
    </CardStyle>
  );
};

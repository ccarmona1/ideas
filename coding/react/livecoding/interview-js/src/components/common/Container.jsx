import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10rem;
  column-gap: 6vw;
  transition: column-gap 0.5s, opacity 0.5s;
  animation: ${fadeIn} 1s;
  row-gap: 0;

  @media (max-width: 770px) {
    grid-template-columns: 1fr;
    row-gap: 6vh;
    transition: row-gap 0.5s, opacity 0.5s;
  }
`;

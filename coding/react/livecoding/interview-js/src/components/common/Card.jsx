import styled, { keyframes } from 'styled-components';

const transition = keyframes`
 from {
  opacity: 0%;
 }
 to {
  opacity: 100%;
 }
`;

export const Card = styled.div`
  box-sizing: border-box;
  border: solid;
  border-color: rgb(0, 0, 0, 0.5);
  border-radius: 1rem;
  box-shadow: 10px 5px 50px black;
  padding: 1rem;
  animation: ${transition} 1s ease;
`;

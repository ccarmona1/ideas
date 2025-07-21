import styled, { keyframes } from 'styled-components';

const dots = keyframes`
  0%, 20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60%, 100% {
    content: '...';
  }
`;

const Spinner = styled.div`
  &::after {
    content: '...';
    animation: ${dots} 1.5s steps(4, end) infinite;
  }
`;

export const Loading = ({ name }) => {
  return <Spinner>Loading {name}</Spinner>;
};

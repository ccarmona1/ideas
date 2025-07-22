import styled, { keyframes } from 'styled-components';

const LoadingKeyFrames = keyframes`
 0% {content: '.'}
 50% {content: '..'}
 100% {content: '...'}
`;

export const Loading = styled.div`
  &::after {
    content: '';
    animation: ${LoadingKeyFrames} 1s steps(3, end) infinite;
    display: inline-block;
    width: 2em;
  }
`;

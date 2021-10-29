import styled from 'styled-components';

export const LoadingStateAnimationWrapper = styled.div`
  position: relative;
  animation: flickerAnimation 2s infinite;

  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

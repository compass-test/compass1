import styled from '@emotion/styled';

export const Shrink = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: shrink 1000ms ease;
  }

  @keyframes shrink {
    0% {
      min-height: 40px;
    }
    100% {
      min-height: 0;
    }
  }
`;

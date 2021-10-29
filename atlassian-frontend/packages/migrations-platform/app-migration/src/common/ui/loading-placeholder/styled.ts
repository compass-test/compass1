import styled from 'styled-components';

import { N20, N30 } from '@atlaskit/theme/colors';

export const LoadingRectangle = styled.div`
  @keyframes shimmer {
    0% {
      background-position: -100px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }

  user-select: none;
  animation: shimmer 2s infinite forwards linear;
  background-color: ${N30};
  background-repeat: no-repeat;
  background-image: linear-gradient(
    to right,
    ${N30} 10%,
    ${N20} 30%,
    ${N30} 50%
  );
`;

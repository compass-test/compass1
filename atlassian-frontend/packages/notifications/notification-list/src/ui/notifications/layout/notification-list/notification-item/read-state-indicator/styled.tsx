import styled from '@emotion/styled';

import { B200, B400, N40 } from '@atlaskit/theme/colors';

export const UnreadIndicator = styled.div`
  background-color: ${B400};
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

export const UnreadIndicatorWrapper = styled.button`
  // Reset default btn styles
  border: none;
  padding: 0;
  background-color: transparent;

  pointer-events: all;
  z-index: 1;

  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${N40};
  }

  &:focus {
    box-shadow: ${B200} 0 0 0 2px;
  }
`;

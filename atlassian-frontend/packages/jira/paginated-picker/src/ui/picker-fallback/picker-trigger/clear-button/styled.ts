import styled from 'styled-components';

import { N50, N70 } from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';

export const StyledClearButton = styled.div`
  background: 0;
  border: 0;
  border-radius: ${borderRadius() / 2}px;
  color: ${N50};
  cursor: pointer;
  height: ${gridSize() * 3}px;
  line-height: 1;
  outline: 0;
  padding: 0;
  position: absolute;
  right: ${gridSize() / 2}px;
  top: 50%;
  margin-top: -${(gridSize() * 3) / 2}px;
  transition: background-color 200ms opacity 200ms;
  width: ${gridSize() * 3}px;
  &:hover,
  &:focus {
    color: ${N70};
  }
`;

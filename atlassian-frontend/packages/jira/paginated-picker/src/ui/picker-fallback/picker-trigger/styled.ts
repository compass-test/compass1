import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const ChildrenWrapper = styled.div`
  padding-right: ${gridSize() * 2}px;
`;

export const StyledChevron = styled.div`
  background: 0;
  border: 0;
  height: ${gridSize() * 3}px;
  line-height: 1;
  outline: 0;
  padding: 0;
  position: absolute;
  right: 0px;
  top: 50%;
  margin-top: -${(gridSize() * 3) / 2}px;
  width: ${gridSize() * 3}px;
`;
export const StyledClose = styled.div`
  background: 0;
  border: 0;
  height: ${gridSize() * 3}px;
  line-height: 1;
  outline: 0;
  padding: 0;
  position: absolute;
  right: -4px;
  top: 50%;
  margin-top: -${(gridSize() * 3) / 2}px;
  width: ${gridSize() * 3}px;
`;

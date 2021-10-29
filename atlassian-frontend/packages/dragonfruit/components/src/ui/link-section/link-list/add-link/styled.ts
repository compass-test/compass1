import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: ${gridSize()}px ${gridSize() * 1.25}px;

  // Override default styles
  background-color: ${colors.N0};
  border: none;
  width: 100%;
`;

export const IconPositionWrapper = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

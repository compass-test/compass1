import styled from 'styled-components';

import { N0, N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const StepHeading = styled.h2`
  margin: ${gridSize() * 2}px 0;
  display: flex;
  align-items: center;
`;

export const StepNumber = styled.span`
  height: 24px;
  width: 24px;
  background-color: ${N800};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${N0};
  font-size: 12px;
  margin-right: ${gridSize()}px;
`;

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const TimeCellStyled = styled.time`
  padding-top: ${gridSize() / 2}px;
  padding-bottom: ${gridSize() / 2}px;
  color: ${colors.N500};
  display: block;
`;

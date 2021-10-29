import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Description = styled.div`
  font-size: 14px;
  color: ${colors.N500};
`;

export const EnvironmentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EnvironmentText = styled.div`
  padding-left: ${gridSize()}px;
`;

export const EventTableWrapper = styled.div`
  padding-top: ${gridSize() * 4}px;
`;

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AcknowledgedStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AcknowledgedStatusText = styled.div`
  margin-right: ${gridSize() / 2}px;
  color: ${colors.N400};
`;

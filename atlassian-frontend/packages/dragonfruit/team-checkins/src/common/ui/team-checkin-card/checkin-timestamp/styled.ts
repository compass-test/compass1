import styled from '@emotion/styled';

import { N30 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const CheckinTimestampWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: ${gridSize() * 20}px;
  height: ${gridSize() * 3}px;
  background: ${N30};
  padding: ${gridSize() * 0.5}px ${gridSize() * 0.25}px;
`;

export const Timestamp = styled.span`
  margin-left: ${gridSize() * 0.5}px;
  font-size: 14px;
  line-height: ${gridSize() * 3}px;
`;

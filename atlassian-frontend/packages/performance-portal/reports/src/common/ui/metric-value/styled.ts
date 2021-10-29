import styled from '@emotion/styled';

import { N200, N400 } from '@atlaskit/theme/colors';

export const MetricValueStyled = styled.div`
  font-weight: 500;
  color: ${N400};
  font-size: 16px;
  white-space: nowrap;
`;

export const MetricGoal = styled.span`
  font-size: 11px;
  color: ${N200};
  white-space: nowrap;
  margin-top: 9px;
`;

export const AlignLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

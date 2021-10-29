import styled from '@emotion/styled';

import { N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const PastTeamCheckinsWrapper = styled.div`
  margin-top: ${gridSize() * 2}px;
`;
export const Heading = styled.div`
  ${h400()};
  color: ${N800};
  font-size: 14px;
  line-height: 16px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const PastTeamCheckinsList = styled.div`
  & > :not(:last-child) {
    margin-bottom: ${gridSize() * 3}px;
  }
`;

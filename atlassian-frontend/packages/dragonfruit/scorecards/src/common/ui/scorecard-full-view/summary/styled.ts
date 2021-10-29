import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h200, h600 } from '@atlaskit/theme/typography';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
`;

export const ScorecardName = styled.div`
  ${h600()}
  ${lineClamp(2)};
  margin-top: 0px;
`;

export const ScorecardDescription = styled.div`
  ${h200()}
  color: ${colors.heading};
  font-weight: 300;
  margin-right: ${gridSize() * 2}px;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: right;
`;

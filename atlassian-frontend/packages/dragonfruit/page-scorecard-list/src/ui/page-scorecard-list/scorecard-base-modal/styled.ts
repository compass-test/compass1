import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h600 } from '@atlaskit/theme/typography';

export const Divider = styled.hr`
  /* Neutral (Light) / N40 */
  border: 1px solid #dfe1e6;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: ${gridSize() * 3}px;
  width: 100%;
`;

export const ScorecardFormWrapper = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  max-width: 550px;
  width: 80%;
`;

export const ScorecardFormHeading = styled.div`
  ${h600}
  margin-top: ${gridSize() * 3}px;
`;

export const ErrorMessageWrapper = styled.div`
  margin-right: auto;
`;

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const HeaderWrapper = styled.div`
  text-align: center;
`;

export const IconAndSummary = styled.div`
  display: flex;
  margin: ${gridSize() * 2}px 0;
`;

export const MessageWrapper = styled.p`
  margin: 0 0 0 ${gridSize()}px;
`;

// export const NextStepWrapper = styled.div`
//   float: right;
// `;

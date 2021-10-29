import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const SummaryContainer = styled.div`
  // Spacing between description content and element below should be 24px,
  // but the inline edit already has an 8px padding, so the margin here
  // should be 24px - 8px = 16px, which is "gridSize() * 2"
  margin-bottom: ${gridSize() * 2}px;
`;

export const EmptySummaryContainer = styled.div`
  // In empty state, there's no inline edit so the full 24px padding
  // should be added
  margin-bottom: ${gridSize() * 3}px;
`;

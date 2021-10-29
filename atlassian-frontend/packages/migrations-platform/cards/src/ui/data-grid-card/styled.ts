import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, gridSize, typography } from '@atlaskit/theme';

export const DataGridWrapper = styled.div`
  ${elevation.e100()}
  font-size: 14px;
  border-radius: 3px;
  background: ${colors.N0};
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: ${gridSize() * 3}px;
`;

export const DataGridTitle = styled.div`
  ${typography.h100()}
  margin: 0;
`;

export const DataGridItem = styled.div`
  margin: ${gridSize() * 2}px 0 0 0;
`;

export const DataGridLabel = styled.div`
  color: ${colors.subtleHeading};
  font-size: 11px;
`;

export const DataGridValue = styled.div`
  ${typography.h500()}
  margin: 0;
`;

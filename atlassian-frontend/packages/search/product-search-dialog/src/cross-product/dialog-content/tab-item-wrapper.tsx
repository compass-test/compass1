// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import styled from 'styled-components';
/**
 * This provides additional margins around the tab items to fit our design.
 * Only the first item should have a left margin.
 */
export const TabItemWrapper = styled.div<{ isFirstItem?: boolean }>`
  margin-top: ${gridSize() / 2}px;
  ${({ isFirstItem }) => isFirstItem && `margin-left: ${gridSize()}px;`}
`;

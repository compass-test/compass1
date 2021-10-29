// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const PeriodsContainer = styled.ol`
  position: relative;
  height: ${gridSize() * 3.75}px;
  list-style: none;

  & > li {
    position: absolute;
    top: ${gridSize() / 2}px;
    height: ${gridSize() * 2.5}px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    border-radius: 3px;
  }
`;

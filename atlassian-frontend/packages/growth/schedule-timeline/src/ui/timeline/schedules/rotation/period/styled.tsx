// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const HistoricalMarker = styled.span`
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  height: ${gridSize() / 2}px;
  background-color: hsla(0, 0%, 100%, 0.5);
`;

import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const Actions = styled.div`
  margin-top: ${gridSize() * 2}px;

  & > :not(:last-child) {
    margin-bottom: ${gridSize()}px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

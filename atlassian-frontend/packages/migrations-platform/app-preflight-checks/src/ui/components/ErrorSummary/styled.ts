import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const Wrapper = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
`;

export const Message = styled.span`
  margin-left: ${gridSize()}px;
`;

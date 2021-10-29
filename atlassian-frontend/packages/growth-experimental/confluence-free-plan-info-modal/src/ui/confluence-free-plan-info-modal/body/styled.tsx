import styled from 'styled-components';

/* eslint-disable-next-line @atlassian/tangerine/import/entry-points */
import { gridSize } from '@atlaskit/theme';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: ${gridSize() * 6}px ${gridSize() * 7}px ${gridSize() * 5}px;
`;

export const Actions = styled.div`
  margin: ${gridSize() * 2}px auto 0;
`;

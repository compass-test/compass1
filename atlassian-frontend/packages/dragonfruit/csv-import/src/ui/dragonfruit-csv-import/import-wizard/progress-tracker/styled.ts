import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const Wrapper = styled.div`
  width: 500px;
  margin-top: ${gridSize() * 4}px;
`;

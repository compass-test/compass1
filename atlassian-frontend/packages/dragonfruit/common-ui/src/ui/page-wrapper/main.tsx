import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const PageWrapper = styled.div`
  margin-top: ${gridSize() * 4}px;
  margin-bottom: ${gridSize() * 4}px;
  margin-left: ${gridSize() * 16}px;
  margin-right: ${gridSize() * 16}px;
  width: 100%;
`;

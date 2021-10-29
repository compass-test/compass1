import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px ${gridSize() * 5}px;
  height: 100%;
`;

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ActionsButtonWrapper = styled.div`
  margin-left: ${gridSize() * 3}px;
  button {
    height: ${gridSize() * 4}px;
    padding: ${gridSize() * 0.5}px;
  }
`;

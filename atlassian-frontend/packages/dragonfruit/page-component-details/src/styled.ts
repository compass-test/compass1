import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${gridSize() * 54}px;
`;

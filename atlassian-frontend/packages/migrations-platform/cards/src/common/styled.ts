import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

const spacing = gridSize() * 2;

export const CardsWrapper = styled.div`
  padding: ${spacing}px;
  border-radius: 3px;
  background: rgba(9, 30, 66, 0.04);
`;

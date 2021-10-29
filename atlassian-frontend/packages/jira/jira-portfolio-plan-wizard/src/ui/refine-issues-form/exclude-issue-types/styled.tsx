import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ListItem = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: ${gridSize() * 2}px;
    height: ${gridSize() * 2}px;
    border-radius: 3px;
    object-fit: contain;
  }
`;

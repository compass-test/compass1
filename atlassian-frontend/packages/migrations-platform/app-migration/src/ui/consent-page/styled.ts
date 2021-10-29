import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

import { tableWrapperStyles } from '../../common/ui/app-table';

const GRID_SIZE = gridSize();

export const Wrapper = styled.div`
  ${tableWrapperStyles}

  td {
    height: ${GRID_SIZE * 9}px;
  }
`;

export const Subtitle = styled.span`
  padding: ${GRID_SIZE * 2}px 0 ${GRID_SIZE * 4}px 0;
`;

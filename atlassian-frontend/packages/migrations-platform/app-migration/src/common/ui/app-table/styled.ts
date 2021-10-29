import { css } from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

const GRID_SIZE = gridSize();

// AK Table component doesn't have a convenient way to override styles
// !important is a necessary evil here
export const tableWrapperStyles = css`
  th {
    padding: ${GRID_SIZE}px !important;
  }

  td {
    box-sizing: border-box !important;
    padding: ${GRID_SIZE * 2}px ${GRID_SIZE}px !important;
  }

  th,
  td {
    &:first-child {
      padding-left: ${GRID_SIZE * 3}px !important;
    }

    &:last-child {
      padding-right: ${GRID_SIZE * 3}px !important;
    }
  }
`;

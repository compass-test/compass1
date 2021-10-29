import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const TableWrapper = styled.div`
  margin: ${gridSize()}px ${gridSize() * 8}px;
  && tr {
    height: 1px;
  }
  && td {
    padding: 0;
    height: inherit;
    max-width: ${gridSize() * 40}px;
  }
`;

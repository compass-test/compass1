import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const TableWrapper = styled.div`
  margin: ${gridSize()}px ${gridSize() * 34}px;
  && td {
    width: 50%;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

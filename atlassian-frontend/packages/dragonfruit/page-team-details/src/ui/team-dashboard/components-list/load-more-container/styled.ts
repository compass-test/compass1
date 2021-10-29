import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${gridSize()}px;
  margin-top: -${gridSize()}px;
`;

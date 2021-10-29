import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Footer = styled.div`
  border-top: #ebedf0 solid ${gridSize() / 4}px;
  padding-top: ${gridSize() / 2}px;
  padding-bottom: ${gridSize() / 2}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

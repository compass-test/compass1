import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Footer = styled.footer`
  padding-top: ${gridSize()};
  display: flex;
  justify-content: flex-end;
  padding: ${gridSize() * 3}px 0;
`;

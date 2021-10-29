import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: ${gridSize() * 2}px 0;
`;

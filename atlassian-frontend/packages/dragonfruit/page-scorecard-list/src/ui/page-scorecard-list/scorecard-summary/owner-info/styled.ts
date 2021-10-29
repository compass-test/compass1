import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const OwnerLink = styled.a`
  padding-left: ${gridSize() * 0.5}px;
`;

export const OwnerText = styled.div`
  color: ${colors.N400};
  margin-bottom: ${gridSize}px;
  display: inline-flex;
  font-size: 11px;
  line-height: 14px;
`;

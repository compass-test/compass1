import styled from '@emotion/styled';

import { B500 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';

export const Caption = styled.div`
  display: flex;
  font-size: ${fontSize() * 1.25}px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${B500};
  margin-bottom: ${gridSize()}px;
`;

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Divider = styled.hr`
  border: 0;
  border-bottom: 2px solid ${colors.N30A};
  margin: ${gridSize()}px 0;
  width: 100%;
  display: block;
`;

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h100 } from '@atlaskit/theme/typography';

export const Text = styled.span`
  ${h100}
  margin-left: ${gridSize()}px;
`;

import styled from 'styled-components';

import { P500 as infoColor } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const spacing = gridSize();

export const Section = styled.section`
  display: flex;
  align-items: center;
  color: ${infoColor};
  margin: ${spacing}px 0 ${spacing * 4}px 0;
  font-size: 11px;

  > p {
    margin: 0;
    margin-left: ${spacing}px;
  }
`;

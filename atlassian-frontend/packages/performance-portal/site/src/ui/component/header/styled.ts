import styled from '@emotion/styled';

import { N800 } from '@atlaskit/theme/colors';
import { fontFamily } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

import '../../../assets/css/charlie-display-font.css';

export const AlignVertically = styled.div`
  display: flex;
  align-items: center;
`;

export const H1 = styled.div`
  font-size: ${headingSizes.h700.size}px;
  font-family: 'Charlie_Display_Semibold', ${fontFamily()};
  color: ${N800};
  margin-right: 20px;
`;

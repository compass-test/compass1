import styled from 'styled-components';

import { N200, R500 } from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const TextWrapper = styled.a`
  color: ${N200};
  font-size: ${fontSizeSmall()}px;
  &:hover {
    color: ${N200};
  }
`;

export const ErrorTextWrapper = styled.div`
  color: ${R500};
  display: flex;
  font-size: ${fontSizeSmall()}px;
`;

export const ErrorLink = styled.a`
  padding-left: ${gridSize() / 2}px;
  color: ${R500};
  &:hover {
    color: ${R500};
  }
`;

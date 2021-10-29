import styled from '@emotion/styled';

import { G400, N200, R400 } from '@atlaskit/theme/colors';
import { fontFamily, gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';
type Status = {
  error?: boolean;
  valid?: boolean;
};

export const Message = styled('div')`
  ${{ ...h200 }};
  font-weight: normal;
  font-family: ${fontFamily()};
  color: ${({ error, valid }: Status) => {
    if (error) {
      return R400;
    }
    if (valid) {
      return G400;
    }
    return N200;
  }};
  margin-top: ${gridSize() * 0.5}px;
  display: flex;
  justify-content: baseline;
`;

export const IconWrapper = styled.span`
  display: flex;
`;

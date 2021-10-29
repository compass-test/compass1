import styled from '@emotion/styled';

import { N200, N40 } from '@atlaskit/theme/colors';
import { headingSizes } from '@atlaskit/theme/typography';

export const WalletHeading = styled.h2`
  text-transform: uppercase;
  font-size: ${headingSizes.h200.size}px;
  line-height: ${headingSizes.h200.lineHeight}px;
  color: ${N200};
  margin: 0;
  font-weight: 'bold';
`;

export const Separator = styled.div`
  border-top: 1px solid ${N40};
`;

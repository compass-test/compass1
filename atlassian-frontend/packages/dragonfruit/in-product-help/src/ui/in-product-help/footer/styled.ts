import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

export const FooterContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 11px;
  color: ${colors.N200};
`;

export const FooterLink = styled.a`
  font-weight: 500;
  color: ${colors.N300};
`;

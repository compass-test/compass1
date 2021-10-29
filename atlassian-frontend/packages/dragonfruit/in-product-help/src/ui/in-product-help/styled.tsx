import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

export const ContentWrapper = styled.div`
  position: relative;
  min-width: 100%;
  flex: 1 1;
  overflow-x: hidden;
  background-color: #fff;
  height: 100%;
`;

export const FooterContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 11px;
  color: ${colors.N200};
`;

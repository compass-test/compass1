import styled from 'styled-components';

import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const LinkStyled = styled.span`
  margin-left: 5px;
  padding: 2px;
  float: left;
  ${lineClamp(1)}
`;

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

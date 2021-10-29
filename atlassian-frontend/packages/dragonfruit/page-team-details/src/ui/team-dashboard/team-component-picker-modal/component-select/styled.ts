import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';

export const LabelDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  color: ${colors.N200};
  font-weight: 700;
`;

export const ComponentColumnLabel = styled.span`
  overflow: hidden;
  flex: 2 1;
`;

export const OwnerColumnLabel = styled.span`
  overflow: hidden;
  flex: 1 1;
`;

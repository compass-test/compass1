import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

export const TextMatch = styled.span<{ isActive?: boolean }>`
  background-color: ${(props) =>
    props.isActive ? colors.P300 : 'rgba(135, 119, 217, 0.7)'};
  border-radius: 2px;
  color: ${colors.N0};
`;
export const Link = styled.a`
  display: flex;
  white-space: nowrap;
  margin-right: 5px;
`;

export const Ellipsis = styled.div<{ ellipsis?: boolean }>`
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
`;

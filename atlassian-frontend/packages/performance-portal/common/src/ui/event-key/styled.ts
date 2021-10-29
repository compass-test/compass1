import styled from '@emotion/styled';

import { N20, N800 } from '@atlaskit/theme/colors';

export const StyledEventKey = styled.code`
  background: ${N20};
  color: ${N800};
  border-radius: 3px;
  padding: 4px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
`;

export type IconWrapperProps = {
  iconState: boolean;
};

export const IconWrapper = styled.span`
  display: inline-block;
  width: ${(props: IconWrapperProps) => (props.iconState ? '20px' : '0')};
  overflow: hidden;
  transition: width 100ms;
  position: absolute;
  background: ${N20};
  padding: 3px 2px 0 0;
  border-radius: 3px;
  text-align: right;
`;

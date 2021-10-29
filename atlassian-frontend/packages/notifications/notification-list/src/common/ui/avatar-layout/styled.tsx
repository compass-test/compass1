import styled from '@emotion/styled';

import { N20 } from '@atlaskit/theme/colors';

export const AvatarWrapper = styled.div`
  margin-right: 8px;
`;

export const AvatarCircleSkeleton = styled.div<{
  size: number;
  bgColor?: string;
}>`
  background-color: ${(props) => props.bgColor ?? N20};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  & svg {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  },
`;

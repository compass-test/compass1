import styled from '@emotion/styled';

import { N20 } from '@atlaskit/theme/colors';

export const SkeletonWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
  width: 100%;
  padding: 8px;
  margin-right: -8px;
  margin-left: -8px;
`;

export const AvatarContainer = styled.div`
  height: 40px;
  width: 40px;
  background-color: ${N20};
  border-radius: 100%;
  margin-right: 12px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

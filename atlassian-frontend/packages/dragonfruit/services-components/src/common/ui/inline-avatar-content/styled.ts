import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const InlineAvatarContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkWrapper = styled.a`
  display: flex;
  align-items: center;
`;

export const AvatarWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 24px;
`;

export const ContentWrapper = styled.span`
  margin-left: ${gridSize}px;
`;

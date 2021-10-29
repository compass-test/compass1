import styled from '@emotion/styled';

import { N20A } from '@atlaskit/theme/colors';
import * as typography from '@atlaskit/theme/typography';

export const CenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px 44px 0px;
`;

export const Heading = styled.h3`
  font-size: ${typography.headingSizes.h400.size}px;
  line-size: ${typography.headingSizes.h400.lineHeight}px;
  flex-grow: 1;
  margin-top: 0;
  margin-bottom: 4px;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-top: 0px;
`;

export const NoNotificationsTextContainer = styled.div`
  margin-top: 16px;
  max-width: 225px;
  text-align: center;
`;

export const NoUnreadNotificationsButtonContainer = styled.div`
  margin-top: 16px;
`;

export const NoNotificationsSkeleton = styled.div<{ noAnimation?: boolean }>`
  width: 198px;
  height: 198px;
  border-radius: 50%;
  background-color: ${N20A};
  margin-top: 42px;
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    ${(p) => (p.noAnimation ? '' : 'animation: shimmer 5s infinite;')}
    content: '';
    z-index: 10;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

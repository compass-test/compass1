import styled from '@emotion/styled';

import * as typography from '@atlaskit/theme/typography';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px 44px 0px;
`;

export const SmallSVGContainer = styled.div`
  svg {
    height: 41px;
    width: 48px;
    margin-bottom: 12px;
  }
`;

export const MediumSVGContainer = styled.div`
  svg {
    height: 82px;
    width: 96px;
    margin-bottom: 12px;
  }
`;

export const LargeSVGContainer = styled.div`
  svg {
    height: 164px;
    width: 192px;
    margin-bottom: 12px;
  }
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

export const PlaceholderSpacing = styled.div``;

export const NoNotificationsTextContainer = styled.div`
  margin-top: 16px;
  max-width: 300px;
  text-align: center;
`;

export const NoUnreadNotificationsButtonContainer = styled.div`
  margin-top: 16px;
`;

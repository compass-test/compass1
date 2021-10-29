import styled from 'styled-components';

import { h500 } from '@atlaskit/theme/typography';

interface ModalFeatureComponentProps {
  isFullWidth: boolean;
}

export const FeatureComponentContainer = styled.div<ModalFeatureComponentProps>`
  display: flex;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: ${({ isFullWidth }) => (isFullWidth ? '500px ' : '250px')};
  margin: 10px 0;
`;

export const FeatureBody = styled.div`
  margin-left: 12px;
`;

export const FeatureTitle = styled.p`
  ${h500()};
  margin-bottom: 4px;
`;

export const FeatureTitleIcon = styled.div`
  margin-top: 0;
  display: flex;
  align-items: middle;
`;

export const FeatureInfoIcon = styled.div`
  margin-left: 4px;
`;

export const FeatureContent = styled.div`
  font-size: 14px;
`;

export const FeatureImageBlock = styled.div<ModalFeatureComponentProps>`
  width: ${({ isFullWidth }) => (isFullWidth ? '72px ' : '32px')};
  height: ${({ isFullWidth }) => (isFullWidth ? '72px' : '32px')};
  flex-shrink: 0;
`;

export const FeatureImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;

export const FeatureListItemContainer = styled.div<{ isFullWidth: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: ${({ isFullWidth }) => (isFullWidth ? '500px ' : '250px')};
  margin: 10px 0;
`;

export const FeatureListItemImageBlock = styled.div<{ isFullWidth: boolean }>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

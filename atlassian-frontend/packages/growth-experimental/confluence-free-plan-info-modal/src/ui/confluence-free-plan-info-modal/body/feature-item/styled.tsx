/* eslint-disable @atlassian/tangerine/import/entry-points */
import styled from 'styled-components';

import { colors, gridSize, typography } from '@atlaskit/theme';

export const FeatureItemWrapper = styled.div`
  width: 50%;
  display: flex;
  box-sizing: border-box;
  margin-bottom: ${gridSize() * 2}px;

  &:nth-of-type(2n) {
    padding-left: ${gridSize() * 1.5}px;
  }
  &:nth-of-type(2n-1) {
    padding-right: ${gridSize() * 1.5}px;
  }
`;

export const FeatureContent = styled.div`
  flex-grow: 1;
  padding-left: ${gridSize() * 1.5}px;
`;

export const FeatureIcon = styled.div`
  & > svg {
    fill: ${colors.N500};
  }
`;

export const FeatureTitle = styled.h5`
  ${typography.h500()};
`;

export const FeatureDescription = styled.p`
  font-size: 11px;
  margin-top: ${gridSize() * 0.5}px;
`;

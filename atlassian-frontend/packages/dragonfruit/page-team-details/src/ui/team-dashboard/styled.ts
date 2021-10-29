import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import * as typography from '@atlaskit/theme/typography';

export const TopSection = styled.div`
  display: flex;
  align-items: baseline;
  padding-left: ${gridSize()}px;
  padding-right: ${gridSize()}px;
  padding-top: ${gridSize()}px;
  && {
    margin-top: ${gridSize() * 0.5}px;
  }
`;

export const EditProfileWrapper = styled.div`
  padding-left: ${gridSize() * 0.5}px;
  padding-right: ${gridSize() * 0.5}px;
`;

export const TeamSection = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const SectionTitle = styled.h1`
  ${typography.h500()};
  margin-left: ${gridSize()}px;
  padding-bottom: ${gridSize() * 3}px;
`;

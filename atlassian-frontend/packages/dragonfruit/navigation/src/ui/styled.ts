import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LozengeContainer = styled.div`
  display: flex;
  margin-left: ${gridSize()}px;
  align-items: center;
`;

export const FeedbackContainer = styled.div`
  position: absolute;
  right: ${gridSize()}px;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1;
`;

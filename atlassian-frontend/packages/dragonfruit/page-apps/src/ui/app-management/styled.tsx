import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Byline = styled.div`
  margin-bottom: ${gridSize()}px;
`;

export const HelpText = styled.div`
  margin-top: ${gridSize() * 4}px;
  display: flex;
  justify-content: center;
  white-space: pre;
`;

export const AppListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${gridSize()}px;
  margin-bottom: ${gridSize() * 4}px;
`;

export const LozengeContainer = styled.h2`
  margin-top: ${gridSize()}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const ClickableContainer = styled.div`
  cursor: pointer;
`;

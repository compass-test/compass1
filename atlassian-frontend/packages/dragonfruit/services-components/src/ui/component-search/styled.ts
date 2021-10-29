import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: ${gridSize() * 3}px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${gridSize() * 3}px;
  margin-right: ${gridSize()}px;
`;

export const TextOverflowWrapper = styled.span`
  display: block;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

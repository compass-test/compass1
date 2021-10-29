import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const ComponentFieldValueContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: ${gridSize() * 3}px;
`;

export const ComponentTypeIconContainer = styled.span`
  display: flex;
  align-items: center;
  height: ${gridSize() * 3}px;
  margin-right: ${gridSize()}px;
`;

export const ComponentNameContainer = styled.span`
  display: block;
  color: ${colors.N500};
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: ${gridSize() * 3}px 0;
`;

export const ClearAcknowledgementsField = styled.div`
  display: flex;
  align-items: center;
`;

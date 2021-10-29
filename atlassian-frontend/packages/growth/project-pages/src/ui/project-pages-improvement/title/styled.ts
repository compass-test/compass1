import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

export const TryLozenge = styled.span`
  display: flex;
  padding-top: ${gridSize() / 2}px;
  padding-left: ${gridSize()}px;
`;

export const TitleWrapper = styled.span`
  display: flex;
  align-items: center;
  /* prevent legacy batch.css in JFE from overriding these styles */
  font-size: inherit;
  font-weight: 500;
`;

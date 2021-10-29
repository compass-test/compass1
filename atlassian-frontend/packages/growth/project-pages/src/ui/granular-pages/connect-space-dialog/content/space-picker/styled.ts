import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

export const Container = styled.div`
  margin: ${gridSize()}px 0 0;
  display: flex;
  flex-direction: column;
`;

export const Instructions = styled.p`
  margin: 0 0 ${gridSize() * 2}px;
`;

export const IconWrapper = styled.div`
  margin-right: ${gridSize()}px;
`;

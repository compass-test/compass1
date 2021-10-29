import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PaddedIcon = styled.div`
  margin-right: ${gridSize() / 2}px;
`;

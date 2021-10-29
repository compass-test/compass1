import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const StyledChild = styled.div`
  margin: ${gridSize() / 2}px;
  min-width: 0;
`;

export const StyledOption = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledItem = styled.div`
  display: flex;
`;

export const StyledChildIcon = styled.div`
  margin-left: ${gridSize()}px;
`;

export const StyledOptionIcon = styled.img`
  border-radius: 50%;
  height: 16px;
  width: 16px;
  display: flex;
  margin: 2px;
`;

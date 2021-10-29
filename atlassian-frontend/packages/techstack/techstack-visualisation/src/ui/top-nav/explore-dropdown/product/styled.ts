import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${gridSize()}px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  background-color: #0052cc;
  border-radius: ${gridSize()}px;
  overflow: hidden;
  margin-right: ${gridSize()}px;
`;

export const TextWrapper = styled.div``;

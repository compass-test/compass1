import styled from '@emotion/styled';

import { B50 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div<{ isUseCaseUsed: boolean }>`
  display: flex;
  padding: ${gridSize()}px;
  height: 100%;
  align-items: center;
  ${({ isUseCaseUsed }) => (isUseCaseUsed ? `background-color: ${B50};` : ``)}
`;

export const Caption = styled.p`
  display: flex;
  margin: 0 ${gridSize()}px;
`;

export const InfoIconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

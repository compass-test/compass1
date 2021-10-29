import styled from '@emotion/styled';

import { B50, N200 } from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div<{ isSolutionUsed: boolean }>`
  display: flex;
  height: 100%;
  padding: ${gridSize()}px;
  justify-content: space-between;
  cursor: pointer;
  ${({ isSolutionUsed }) => (isSolutionUsed ? `background-color: ${B50};` : ``)}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  color: ${N200};
  font-size: ${fontSizeSmall()}px;
`;

export const AvatarPanel = styled.div`
  margin-top: ${gridSize() / 2}px;
  display: flex;
`;

export const LozengeWrapper = styled.span`
  margin-right: ${gridSize()}px;
`;

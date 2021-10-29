import styled from 'styled-components';

import { N0, N200 } from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const TextWrapper = styled.div`
  color: ${N200};
  font-size: ${fontSizeSmall()}px;
`;

export const Heading = styled.dt`
  font-weight: 700;
  color: ${N0};
`;

export const Description = styled.dd`
  margin-left: 0;
  margin-top: 0;
`;

export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gridSize() / 2}px;
`;

export const TooltipWrapper = styled.dl`
  font-size: ${fontSizeSmall()}px;
  padding: ${gridSize()}px;
  min-width: 150px;

  ${DataSection}:not(:first-child) {
    margin-top: ${gridSize()}px;
  }
`;

export const EnvironmentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${gridSize() / 2}px;
`;

export const Link = styled.a`
  color: ${N200};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${N200};
    cursor: pointer;
  }
`;

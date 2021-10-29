import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import * as elevation from '@atlaskit/theme/elevation';

export const ServiceName = styled.div`
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TierText = styled.div`
  color: ${colors.N90};
  font-weight: 600;
  font-size: 12px;
  white-space: nowrap;
`;

// We use a transparent border because the border actually adds width/height to the div
const BORDER_WIDTH = 1.5;
export const Card = styled.div<{ isCurrent: boolean }>`
  ${elevation.e100};
  color: ${colors.N400};
  background: ${(props) => (props.isCurrent ? colors.B50 : colors.N0)};
  border-style: solid;
  border-width: ${BORDER_WIDTH}px;
  border-color: ${(props) => (props.isCurrent ? colors.B75 : 'transparent')};
  padding: ${8 - BORDER_WIDTH}px;
  border-radius: 5px;
  height: calc(100% - 16px);
  width: calc(100% - 16px);
  &:hover {
    background: ${colors.N30};
    border-color: transparent;
  }
`;

export const Link = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

export const Dimensions = styled.div`
  width: 140px;
  height: 60px;
`;

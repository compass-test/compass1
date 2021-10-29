import styled from 'styled-components';

import { N0 } from '@atlaskit/theme/colors';

const BADGE_SIZE = 13;
const BORDER_RADIUS = 3;

export const Badge = styled.div`
  display: block;
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: ${BADGE_SIZE}px;
  height: ${BADGE_SIZE}px;
  z-index: 1;
  border-radius: ${BORDER_RADIUS}px;
  background: ${({ color }) => color};
  color: ${N0};
  font-size: 9px;
  line-height: 0;
  padding-top: 7px;
  text-align: center;
  box-shadow: 0 0 1px ${N0};
  box-sizing: border-box;
`;

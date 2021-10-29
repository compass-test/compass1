import styled from 'styled-components';

import { N500 } from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';

const tierWidth = 45;

export const DisabledTierContainer = styled.div`
  color: ${N500};
  background: rgba(9, 30, 66, 0.04);
  width: ${tierWidth}px;
  line-height: ${gridSize() * 4}px;
  padding: 0 ${gridSize() * 1.5}px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${borderRadius()}px;

  &:hover {
    background: rgba(9, 30, 66, 0.08);
  }
`;

export const TierButtonContainer = styled.div`
  text-align: left;
  width: ${tierWidth}px;
`;

export const TierOptionContainer = styled.div`
  width: 88px;
`;

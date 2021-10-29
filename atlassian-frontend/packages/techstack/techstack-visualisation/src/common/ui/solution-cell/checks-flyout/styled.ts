import styled from '@emotion/styled';

import { N100 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const FlyoutPanel = styled.div<{ isFirst: boolean }>`
  ${({ isFirst }) => (!isFirst ? `margin-top: ${gridSize()}px;` : '')}
`;

export const FlyoutHeader = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

export const CheckType = styled.span`
  color: ${N100};
`;

import styled from '@emotion/styled';

import { B200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

type Props = {
  useBackground: boolean;
};

export const IconWrapper = styled.div<Props>`
  display: inline-block;
  background: ${({ useBackground }) => (useBackground ? B200 : 'transparent')};
  height: ${gridSize() * 3}px;
  width: ${gridSize() * 3}px;
  border-radius: 3px;
  padding: 3px;
  box-sizing: border-box;
  text-align: center;
`;

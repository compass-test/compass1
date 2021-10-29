import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  border-radius: ${borderRadius()}px;
  padding: ${gridSize() * 2}px 20px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 1px 1px rgba(9, 30, 66, 0.25);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${gridSize() / 4}px;
`;

export const Caption = styled.div`
  color: ${colors.N900};
  font-weight: bold;
  font-size: 14px;
  margin: 0px;
`;

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const TeamMembershipSettingsWrapper = styled.div`
  color: ${colors.N300};
  font-size: ${fontSizeSmall()}px;
  margin-top: -${gridSize() * 2}px;
  display: flex;
  align-items: center;
  width: fit-content;

  & > span {
    margin-right: ${gridSize}px;
  }
`;

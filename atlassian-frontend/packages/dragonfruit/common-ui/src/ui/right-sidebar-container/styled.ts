import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const RightSidebarContainer = styled.div`
  position: relative;
  height: 100%;
  padding: ${gridSize()}px;

  background-color: ${colors.N20};

  & > :not(:last-child) {
    margin-bottom: ${gridSize()}px;
  }
`;

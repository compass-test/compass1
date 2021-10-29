import styled from 'styled-components';

import { N200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const BottomBarWrapper = styled.div`
  color: ${N200};
  display: flex;
  align-items: flex-start;
  margin-top: -${gridSize() * 3}px;
  padding-bottom: ${gridSize() * 2}px;
`;

export const SeparatorWrapper = styled.div`
  padding-left: ${gridSize()}px;
  padding-right: ${gridSize()}px;
  line-height: 1;
`;

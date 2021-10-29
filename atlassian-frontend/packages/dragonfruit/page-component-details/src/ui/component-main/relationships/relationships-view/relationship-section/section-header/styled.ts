import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

const ICON_SIZE = 24;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${ICON_SIZE}px;
  justify-content: space-between;
  margin-bottom: ${gridSize()}px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  ${h400};
  margin-top: 0;
`;

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const ItemContainer = styled.div`
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: ${colors.N20};
  }

  a:hover {
    // Do not underline the component name on hover
    text-decoration: none;
  }
`;

export const AcknowledgementContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${gridSize()}px ${gridSize() * 1.5}px;
`;

export const StatusCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${gridSize() / 2}px;
`;

export const ComponentName = styled.div`
  color: ${colors.N800};
`;

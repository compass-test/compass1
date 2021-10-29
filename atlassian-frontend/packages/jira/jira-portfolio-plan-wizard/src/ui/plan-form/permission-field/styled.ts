import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

type Selectable = { isSelected: boolean };

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OptionIconWrapper = styled.div<Selectable>`
  align-self: center;
  display: flex;
  margin-right: ${gridSize}px;
  color: ${(props) => (props.isSelected ? colors.B400 : colors.N100)};
  flex-shrink: 0;
`;

export const OptionLabel = styled.div<Selectable>`
  color: ${(props) => (props.isSelected ? colors.B400 : colors.N800)};
`;

export const OptionExplain = styled.div<Selectable>`
  margin-top: ${gridSize}px;
  color: ${(props) => (props.isSelected ? colors.B400 : colors.N100)};
`;

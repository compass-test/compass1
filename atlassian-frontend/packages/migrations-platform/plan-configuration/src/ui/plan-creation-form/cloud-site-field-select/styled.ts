import styled from 'styled-components';

import { P500 as infoColor } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
type Props = { isFree?: boolean };

const spacing = gridSize();

export const SelectContainer = styled.span<Props>`
  display: block;
  margin-bottom: ${spacing * 2}px;

  ${({ isFree }) =>
    isFree &&
    `* {
      border-color: ${infoColor} !important;
    }`}
`;

export const ButtonGroupWrapper = styled.div`
  margin: ${spacing}px 0;
`;

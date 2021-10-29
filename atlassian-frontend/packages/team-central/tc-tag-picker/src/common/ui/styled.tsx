import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

export const DisabledWrapper = styled.div<{ isDisabled: boolean }>`
  opacity: ${props => (props.isDisabled ? '0.5' : '1')};
`;

export const labelColors = {
  /* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
  tealLight: colors.N500,
  /* eslint-enable @atlaskit/design-system/ensure-design-token-usage */
  blueLight: token('color.text.brand', colors.B500),
  greenLight: token('color.text.success', colors.G500),
  purpleLight: token('color.text.discovery', colors.P500),
  redLight: token('color.text.danger', colors.N500),
  yellowLight: token('color.text.warning', colors.N500),
};

export const backgroundColors = {
  /* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
  tealLight: colors.T50,
  /* eslint-enable @atlaskit/design-system/ensure-design-token-usage */
  blueLight: token('color.accent.subtleBlue', colors.B75),
  greenLight: token('color.accent.subtleGreen', colors.G100),
  purpleLight: token('color.accent.subtlePurple', colors.P75),
  redLight: token('color.accent.subtleRed', colors.R75),
  yellowLight: token('color.accent.subtleOrange', colors.Y100),
};

export const removeHoverColors = {
  tealLight: token('color.accent.boldTeal', colors.T200),
  blueLight: token('color.accent.boldBlue', colors.B100),
  greenLight: token('color.accent.boldGreen', colors.G200),
  purpleLight: token('color.accent.boldPurple', colors.P200),
  redLight: token('color.accent.boldRed', colors.R200),
  yellowLight: token('color.accent.boldOrange', colors.Y300),
};

export const PickerTagByline = styled.div`
  color: ${token('color.text.lowEmphasis', colors.N100)};
  margin-left: ${gridSize() / 2}px;
  font-size: ${fontSizeSmall()}px;
`;

export const TooltipContentsWrapper = styled.div`
  cursor: pointer;
`;

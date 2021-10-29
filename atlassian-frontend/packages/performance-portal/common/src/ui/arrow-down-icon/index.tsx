import React from 'react';

import ArrowDownCircle from '@atlaskit/icon/glyph/arrow-down-circle';
import { G300, N0 } from '@atlaskit/theme/colors';

import { IconProps } from '../../types';

export const ArrowDownIcon = ({
  label = 'percentage diff decrease',
  size = 'medium',
  primaryColor = G300,
  secondaryColor = N0,
}: IconProps) => (
  <ArrowDownCircle
    size={size}
    label={label}
    primaryColor={primaryColor}
    secondaryColor={secondaryColor}
  />
);

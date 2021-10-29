import React from 'react';

import ArrowUpCircle from '@atlaskit/icon/glyph/arrow-up-circle';
import { N0, R300 } from '@atlaskit/theme/colors';

import { IconProps } from '../../types';

export const ArrowUpIcon = ({
  label = 'percentage diff increase',
  size = 'medium',
  primaryColor = R300,
  secondaryColor = N0,
}: IconProps) => (
  <ArrowUpCircle
    size={size}
    label={label}
    primaryColor={primaryColor}
    secondaryColor={secondaryColor}
  />
);

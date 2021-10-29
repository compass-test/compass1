import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  B400,
  G400,
  N800,
  P400,
  R400,
  T400,
  Y400,
} from '@atlaskit/theme/colors';

import messages from './messages';
import { PaletteColor } from './types';

export const colorPalette: PaletteColor[] = [
  {
    label: <FormattedMessage {...messages.blueColor} />,
    value: B400,
    name: 'B400',
  },
  {
    label: <FormattedMessage {...messages.tealColor} />,
    value: T400,
    name: 'T400',
  },
  {
    label: <FormattedMessage {...messages.greenColor} />,
    value: G400,
    name: 'G400',
  },
  {
    label: <FormattedMessage {...messages.yellowColor} />,
    value: Y400,
    name: 'Y400',
  },
  {
    label: <FormattedMessage {...messages.redColor} />,
    value: R400,
    name: 'R400',
  },
  {
    label: <FormattedMessage {...messages.purpleColor} />,
    value: P400,
    name: 'P400',
  },
  {
    label: <FormattedMessage {...messages.darkgrayColor} />,
    value: N800,
    name: 'N800',
  },
];

export const defaultSelectedColorHexValue = colorPalette[0].value;

export const getColorName = (hexiValue: string): string => {
  const { name } =
    colorPalette.find((palette) => palette.value === hexiValue) || {};
  return name || hexiValue;
};

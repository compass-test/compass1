import React from 'react';

import { Size } from '@atlaskit/icon';
import * as colors from '@atlaskit/theme/colors';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

import { IconBackground } from './styled';

type ComponentIconBackgroundProps = {
  type: CompassComponentType;
  size?: Size;
  testId?: string;
  children?: React.ReactNode;
};

const getBackgroundColor = (componentType: CompassComponentType) => {
  switch (componentType) {
    case CompassComponentType.APPLICATION:
      return colors.B200;
    case CompassComponentType.LIBRARY:
      return colors.Y400;
    case CompassComponentType.SERVICE:
      return colors.P300;
    case CompassComponentType.OTHER:
    default:
      return colors.N100;
  }
};

/**
 * Creates an IconBackground with a color based on the type of component.
 */
export function ComponentIconBackground(props: ComponentIconBackgroundProps) {
  const { type, size = 'medium', testId, children } = props;

  const color = getBackgroundColor(type);

  return (
    <IconBackground data-testid={testId} size={size} colour={color}>
      {children}
    </IconBackground>
  );
}

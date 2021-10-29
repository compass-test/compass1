import { Size } from '@atlaskit/icon';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

export const COMPONENT_TYPES = [
  CompassComponentType.SERVICE,
  CompassComponentType.APPLICATION,
  CompassComponentType.LIBRARY,
  CompassComponentType.OTHER,
];

export const SIZES: Record<string, Size> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};

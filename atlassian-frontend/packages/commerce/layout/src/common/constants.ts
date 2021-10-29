import { gridSize } from '@atlaskit/theme/constants';

import type { ExtendedUIScale } from './types';

export const SpacingScale: ExtendedUIScale = {
  SMALLEST: gridSize() * 0.5,
  SMALL: gridSize() * 1,
  MEDIUM: gridSize() * 2,
  LARGE: gridSize() * 3,
  XLARGE: gridSize() * 4,
  XXLARGE: gridSize() * 5,
  LARGEST: gridSize() * 8,
};

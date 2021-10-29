import { gridSize } from '@atlaskit/theme/constants';

const OUTLINE_WIDTH = 2;

export const editViewCss = {
  fontSize: 'inherit',

  '& > input': {
    font: 'inherit',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
  },

  '& > input[data-compact]': {
    height: 'initial',
    padding: `${gridSize() - OUTLINE_WIDTH}px`,
  },
};

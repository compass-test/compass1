import { B300, G300, R300, Y300 } from '@atlaskit/theme/colors';

type ColorRange = { start: number; end: number; color: string };

const COLOR_RANGES: ColorRange[] = [
  { start: 0, end: 0, color: '#C4C4C4' },
  { start: 1, end: 40, color: R300 },
  { start: 40, end: 60, color: Y300 },
  { start: 60, end: 80, color: B300 },
  { start: 80, end: 100, color: G300 },
];

export const getColorForProgress = (progress: number) => {
  for (const { start, end, color } of COLOR_RANGES) {
    if (progress >= start && progress <= end) {
      return color;
    }
  }
};

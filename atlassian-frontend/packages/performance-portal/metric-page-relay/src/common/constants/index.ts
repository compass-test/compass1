import { G300, N40, N50A, N800, R300 } from '@atlaskit/theme/colors';

import { ToplineDateRange } from '../types';

export const theme = {
  text: {
    green: G300,
    red: R300,
    neutral: N800,
  },
  chart: {
    colors: [
      // NOTE: color used here are not yet in atlaskit code
      // this is part of extended color pack from ADG, which is yet to be release
      // at the time of writing this.
      //
      // https://www.figma.com/file/r8C6DpkFYbUvtwkDMmaxFx/perf-portal-designs?node-id=673%3A10978
      '#0055CC', // B800
      '#FFAD29', // Y700
      '#725CE0', // P700
      '#08C6E2', // T500
      '#6B2A19', // R1100
      '#055561', // T1000
      '#9A6104', // Y1000
      '#23A971', // G600
      '#FF7452', // R500
      '#FFDB57', // Y400
    ],
    breakdown: {
      comparisonColor: N40,
    },
  },
  goal: N50A,
};

export const toplineDateRanges: ToplineDateRange[] = [
  { label: '1 month', value: 1 },
  { label: '2 months', value: 2 },
  { label: '6 months', value: 6 },
  { label: '1 year', value: 12 },
];

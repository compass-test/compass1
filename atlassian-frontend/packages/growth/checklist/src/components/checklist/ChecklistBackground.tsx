// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { CHECKLIST_BACKGROUND_HEIGHT } from './styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const completeColors = {
  mainFillColor: colors.G400,
  gradientFillColor: colors.G300,
};

export const inProgressColors = {
  mainFillColor: colors.P500,
  gradientFillColor: colors.P300,
};

export default () => (
  <svg
    width="100%"
    height={`${CHECKLIST_BACKGROUND_HEIGHT}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 360 ${CHECKLIST_BACKGROUND_HEIGHT}`}
    preserveAspectRatio="none"
  >
    <rect
      id="Rectangle"
      width="100%"
      height={`${CHECKLIST_BACKGROUND_HEIGHT}`}
      fill={`${inProgressColors.mainFillColor}`}
    />
    <path
      d="M152.5 48.5C65.5 -9.5 -5.50005 61 0.999949 140H365V35.5C365 35.5 239.5 106.5 152.5 48.5Z"
      fill="url(#linearGradient)"
      fillOpacity="0.71"
    />
    <defs>
      <linearGradient
        id="linearGradient"
        x1="360"
        y1="108.121"
        x2="97.062"
        y2="164.602"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={`${inProgressColors.gradientFillColor}`} />
        <stop
          offset="100%"
          stopColor={`${inProgressColors.gradientFillColor}`}
          stopOpacity="0"
        />
      </linearGradient>
    </defs>
  </svg>
);

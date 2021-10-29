import React from 'react';

import { ContentRenderer, ReferenceAreaProps } from 'recharts';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const renderWeekendLine: ContentRenderer<ReferenceAreaProps> = (
  areaProps,
) => {
  const startingX = areaProps.x ?? 0;
  const areaWidth = areaProps.width ?? 0;
  const areaHeight = areaProps.height ?? 0;
  const offset = areaWidth / 2;
  const x = startingX + offset;

  const y = areaProps.y ?? 0;
  const y2 = areaHeight + y;
  return (
    <line
      x1={x}
      x2={x}
      y1={y}
      y2={y2}
      strokeWidth={areaWidth / 6}
      stroke={colors.N20A}
    />
  );
};

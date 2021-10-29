import React from 'react';

import { ContentRenderer, ReferenceAreaProps } from 'recharts';

import { N20A } from '@atlaskit/theme/colors';

export const renderWeekendLine: ContentRenderer<ReferenceAreaProps> = (
  areaProps,
) => {
  const startingX = areaProps.x ?? 0;
  const areaWidth = areaProps.width ?? 0;
  const areaHeight = areaProps.viewBox?.height ?? 0;
  const offset = areaWidth / 2;
  const x = startingX + offset;

  const y = areaProps.y ? areaProps.y - 10 : 0;
  const y2 = areaHeight + y;
  return (
    <line
      x1={x}
      x2={x}
      y1={y}
      y2={y2}
      strokeWidth={areaWidth / 6}
      stroke={N20A}
    />
  );
};

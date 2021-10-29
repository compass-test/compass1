import React from 'react';

import { AnalyticsChart } from '../src';

export default function LinearChartExample() {
  const data = [
    { label: 'Oct 1', value: 0 },
    { label: 'Oct 2', value: 0 },
    { label: 'Oct 3', value: 0 },
    { label: 'Oct 4', value: 0 },
    { label: 'Oct 5', value: 0 },
    { label: 'Oct 6', value: 0 },
    { label: 'Oct 7', value: 0 },
  ];

  return <AnalyticsChart data={data} />;
}

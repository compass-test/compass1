import React from 'react';

import { AnalyticsChart } from '../src';

export default function LinearChartExample() {
  const data = [
    { label: 'Oct 1', value: 10 },
    { label: 'Oct 2', value: 70 },
    { label: 'Oct 3', value: 30 },
    { label: 'Oct 4', value: 40 },
    { label: 'Oct 5', value: 30 },
    { label: 'Oct 6', value: 110 },
    { label: 'Oct 7', value: 90 },
  ];

  return <AnalyticsChart data={data} />;
}

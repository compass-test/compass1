import React from 'react';

import { AnalyticsChart } from '../src';

export default function LinearChartExample() {
  const date = 'Oct 10';
  const data = [{ label: date, value: 10 }];

  return <AnalyticsChart data={data} />;
}

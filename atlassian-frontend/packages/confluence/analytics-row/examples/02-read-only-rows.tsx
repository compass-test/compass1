import React from 'react';

import { AnalyticsRows } from '../src';
import { ExampleContainer } from '../src/ui/analytics-row/styled';
import { AnalyticsRowContent } from '../src/ui/analytics-row/types';

const editMetric = {
  singular: 'edit',
  plural: 'edits',
};

const person1: AnalyticsRowContent = {
  name: 'Chaki Caronni',
  value: 10402,
  iconUrl: '#',
  metric: editMetric,
  key: '1',
};

const person2: AnalyticsRowContent = {
  name: 'Nanop Rgiersig',
  value: 30,
  iconUrl: '#',
  metric: editMetric,
  key: '2',
};

const person3: AnalyticsRowContent = {
  name: 'Dowdy Metzzo',
  value: 50,
  iconUrl: '#',
  metric: editMetric,
  key: '3',
};

const person4: AnalyticsRowContent = {
  name: 'Daveewart Grdschl',
  value: 4,
  iconUrl: '#',
  metric: editMetric,
  key: '4',
};

const content: AnalyticsRowContent[] = [person1, person2, person3, person4];

export default function ReadOnlyRows() {
  return (
    <div style={{ padding: 50, width: 400 }}>
      <ExampleContainer data-testid={'analytics-row'}>
        <AnalyticsRows content={content} isReadOnly={true} />
      </ExampleContainer>
    </div>
  );
}

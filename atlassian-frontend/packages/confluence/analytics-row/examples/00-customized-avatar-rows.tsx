import React from 'react';

import { AnalyticsRows } from '../src';
import { ExampleContainer } from '../src/ui/analytics-row/styled';
import { AnalyticsRowContent } from '../src/ui/analytics-row/types';

const editMetric = {
  singular: 'edit',
  plural: 'edits',
};

const viewMetric = {
  singular: 'view',
  plural: 'views',
};

const person: AnalyticsRowContent = {
  name: 'Chaki Caronni',
  value: 10402,
  iconUrl: '#',
  metric: editMetric,
  key: '1',
};

const customizedIcon: AnalyticsRowContent = {
  name: 'Compass',
  value: 300,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/687364998/ServiceMatrix?version=6&modificationDate=1617223538590&cacheVersion=1&api=v2',
  metric: viewMetric,
  key: '2',
};

const content = [person, customizedIcon];

export default function CustomizedAvatarRows() {
  return (
    <div style={{ padding: 50, width: 400 }}>
      <ExampleContainer data-testid={'analytics-row'}>
        <AnalyticsRows content={content} />
      </ExampleContainer>
    </div>
  );
}

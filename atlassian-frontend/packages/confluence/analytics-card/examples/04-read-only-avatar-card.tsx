import React from 'react';

import { AnalyticsRowContent } from '@atlassian/analytics-row';

import AnalyticsCard, { ReadOnlyAvatarCardBody } from '../src';

const editMetric = {
  singular: 'edit',
  plural: 'edits',
};

const person1: AnalyticsRowContent = {
  name: 'Chaki Caronni',
  value: 10402,
  iconUrl: '#',
  metric: editMetric,
  key: '10',
};

const person2: AnalyticsRowContent = {
  name: 'Nanop Rgiersig',
  value: 302,
  iconUrl: '#',
  metric: editMetric,
  key: '2',
};

const person3: AnalyticsRowContent = {
  name: 'Dowdy Metzzo',
  value: 203,
  iconUrl: '#',
  metric: editMetric,
  key: '3',
};

const person4: AnalyticsRowContent = {
  name: 'Daveewart Grdschl',
  value: 44,
  iconUrl: '#',
  metric: editMetric,
  key: '4',
};

const allContent: AnalyticsRowContent[] = [person1, person2, person3, person4];

export default function AvatarAnalyticsCard() {
  const noDataDetails = {
    verb: 'edited',
    noun: 'pages',
  };
  return (
    <div style={{ padding: 50, width: 400 }}>
      <AnalyticsCard
        data-testid="analytics-card"
        title="Most active contributors"
        href="#"
      >
        <ReadOnlyAvatarCardBody
          content={allContent}
          noDataDetails={noDataDetails}
        />
      </AnalyticsCard>
    </div>
  );
}

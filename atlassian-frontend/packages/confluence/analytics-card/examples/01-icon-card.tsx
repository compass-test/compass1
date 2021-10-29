import React from 'react';

import { AnalyticsRowContent } from '@atlassian/analytics-row';

import AnalyticsCard, { IconCardBody } from '../src';

const viewMetric = {
  singular: 'view',
  plural: 'views',
};

const space1: AnalyticsRowContent = {
  name: 'Micros',
  value: 502,
  metric: viewMetric,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/169282319/MICROS?version=4&modificationDate=1525195397590&cacheVersion=1&api=v2',
  key: '10',
};

const space2: AnalyticsRowContent = {
  name: 'Compass',
  value: 305,
  metric: viewMetric,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/687364998/ServiceMatrix?version=6&modificationDate=1617223538590&cacheVersion=1&api=v2',
  key: '2',
};

const space3: AnalyticsRowContent = {
  name: 'Team Anywhere',
  value: 50,
  metric: viewMetric,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/791846337/TEAMA?version=2&modificationDate=1596568392322&cacheVersion=1&api=v2',
  key: '3',
};

const space4: AnalyticsRowContent = {
  name: 'AtlasDesk',
  value: 42,
  metric: viewMetric,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/132076392/AtlasDesk?version=3&modificationDate=1530486192478&cacheVersion=1&api=v2',
  key: '4',
};

const allContent: AnalyticsRowContent[] = [space1, space2, space3, space4];

export default function IconAnalyticsCard() {
  const noDataDetails = {
    verb: 'viewed',
    noun: 'spaces',
  };
  return (
    <div style={{ padding: 50, width: 400 }}>
      <AnalyticsCard
        data-testid="analytics-card"
        title="Popular spaces"
        href="#"
      >
        <IconCardBody content={allContent} noDataDetails={noDataDetails} />
      </AnalyticsCard>
    </div>
  );
}

import React from 'react';

import {
  AnalyticsIconOnHoverDetails,
  AnalyticsRowContent,
  AnalyticsRows,
} from '@atlassian/analytics-row';

import Subtable from '../src';

const visitMetric = {
  singular: 'visit',
  plural: 'visits',
};

const content1: AnalyticsRowContent = {
  name: 'Micros',
  value: 102,
  metric: visitMetric,
  key: '10',
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/169282319/MICROS?version=4&modificationDate=1525195397590&cacheVersion=1&api=v2',
};

const content2: AnalyticsRowContent = {
  name: 'Team Anywhere',
  value: 30,
  iconUrl:
    'https://hello.atlassian.net/wiki/download/attachments/791846337/TEAMA?version=2&modificationDate=1596568392322&cacheVersion=1&api=v2',
  metric: visitMetric,
  key: '2',
};
const allContent: AnalyticsRowContent[] = [content1, content2];

const analyticsIconOnHoverDetails: AnalyticsIconOnHoverDetails = {
  tooltipMessage: 'View space analytics',
};

export default function SearchPanelContentSpacesTable() {
  return (
    <div style={{ padding: 100 }}>
      <Subtable
        title="Most-clicked Spaces"
        testId="search-analytics-panel-table"
      >
        <AnalyticsRows
          content={allContent}
          showIcon={true}
          avatarSize={'small'}
          analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
        />
      </Subtable>
    </div>
  );
}

import React from 'react';

import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import {
  AnalyticsIconOnHoverDetails,
  AnalyticsRowContent,
  AnalyticsRows,
} from '@atlassian/analytics-row';

import Subtable from '../src';

const clickMetric = {
  singular: 'click',
  plural: 'clicks',
};

const content1: AnalyticsRowContent = {
  name: 'How to book an event',
  subname: 'Documentation',
  hasSubname: true,
  value: 10402,
  metric: clickMetric,
  key: '10',
  atlaskitIcon: <Blog24Icon label={'test'} />,
};

const content2: AnalyticsRowContent = {
  name: 'FAQ to provide users booking',
  subname: 'FAQs space',
  hasSubname: true,
  value: 30,
  metric: clickMetric,
  key: '2',
  atlaskitIcon: <Blog24Icon label={'test'} />,
};

const content3: AnalyticsRowContent = {
  name: 'Setting customers up for success',
  subname: 'FAQs space',
  hasSubname: true,
  value: 50,
  metric: clickMetric,
  key: '3',
  atlaskitIcon: <Page24Icon label={'test'} />,
};

const content4: AnalyticsRowContent = {
  name: 'Booking 101',
  subname: 'Team Clementine',
  hasSubname: true,
  value: 4,
  metric: clickMetric,
  key: '4',
  atlaskitIcon: <Page24Icon label={'test'} />,
};

const content5: AnalyticsRowContent = {
  name: 'Booking 102',
  subname: 'Team Mandarin',
  hasSubname: true,
  value: 4,
  metric: clickMetric,
  key: '5',
  atlaskitIcon: <Page24Icon label={'test'} />,
};

const allContent: AnalyticsRowContent[] = [
  content1,
  content2,
  content3,
  content4,
  content5,
];

const analyticsIconOnHoverDetails: AnalyticsIconOnHoverDetails = {
  tooltipMessage: 'View page analytics',
};

export default function SearchPanelContentTable() {
  return (
    <div style={{ padding: 100 }}>
      <Subtable
        title="Most-clicked pages and blogs"
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

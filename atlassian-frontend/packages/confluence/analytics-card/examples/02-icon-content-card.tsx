import React from 'react';

import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import { AnalyticsRowContent } from '@atlassian/analytics-row';

import AnalyticsCard, { IconCardBody } from '../src';

const viewMetric = {
  singular: 'view',
  plural: 'views',
};

const blog1: AnalyticsRowContent = {
  name: 'How to make a pb & j',
  value: 502,
  metric: viewMetric,
  atlaskitIcon: <Blog24Icon label={'How to make a pb & j'} />,
  key: '10',
};

const page2: AnalyticsRowContent = {
  name: 'Cats vs dogs',
  value: 305,
  metric: viewMetric,
  atlaskitIcon: <Page24Icon label={'Cats vs dogs'} />,
  key: '2',
};

const page3: AnalyticsRowContent = {
  name: 'Best pizza in NYC',
  value: 50,
  metric: viewMetric,
  atlaskitIcon: <Page24Icon label={'Best pizza in NYC'} />,
  key: '3',
};

const blog4: AnalyticsRowContent = {
  name: 'What came first: the chicken or the egg?',
  value: 42,
  metric: viewMetric,
  atlaskitIcon: (
    <Blog24Icon label={'What came first: the chicken or the egg?'} />
  ),
  key: '4',
};

const allContent: AnalyticsRowContent[] = [blog1, page2, page3, blog4];

export default function IconAnalyticsCard() {
  const noDataDetails = {
    verb: 'viewed',
    noun: 'pages or blogs',
  };
  return (
    <div style={{ padding: 50, width: 400 }}>
      <AnalyticsCard
        data-testid="analytics-card"
        title="Popular content"
        href="#"
      >
        <IconCardBody content={allContent} noDataDetails={noDataDetails} />
      </AnalyticsCard>
    </div>
  );
}

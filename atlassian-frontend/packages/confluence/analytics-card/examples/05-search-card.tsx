import React from 'react';

import SearchIcon from '@atlaskit/icon/glyph/search';
import { AnalyticsRowContent } from '@atlassian/analytics-row';

import AnalyticsCard, { ReadOnlyIconCardBody } from '../src';

const searchMetric = {
  singular: 'search',
  plural: 'searches',
};

const search1: AnalyticsRowContent = {
  name: 'How to make a pb & j',
  value: 502,
  metric: searchMetric,
  atlaskitIcon: <SearchIcon label={'How to make a pb & j'} />,
  key: '10',
};

const search2: AnalyticsRowContent = {
  name: 'Cats vs dogs',
  value: 305,
  metric: searchMetric,
  atlaskitIcon: <SearchIcon label={'Cats vs dogs'} />,
  key: '2',
};

const search3: AnalyticsRowContent = {
  name: 'Best pizza in NYC',
  value: 50,
  metric: searchMetric,
  atlaskitIcon: <SearchIcon label={'Best pizza in NYC'} />,
  key: '3',
};

const search4: AnalyticsRowContent = {
  name:
    'What came first: the chicken or the egg? What came first: the chicken or the egg? What came first: the chicken or the egg?',
  value: 42,
  metric: searchMetric,
  atlaskitIcon: (
    <SearchIcon
      label={
        'What came first: the chicken or the egg? What came first: the chicken or the egg?'
      }
    />
  ),
  key: '4',
};

const allContent: AnalyticsRowContent[] = [search1, search2, search3, search4];

export default function IconAnalyticsCard() {
  const noDataDetails = {
    verb: 'performed',
    noun: 'searches',
  };
  return (
    <div style={{ padding: 50, width: 400 }}>
      <AnalyticsCard
        data-testid="analytics-card"
        title="Popular searches"
        href="#"
      >
        <ReadOnlyIconCardBody
          content={allContent}
          noDataDetails={noDataDetails}
        />
      </AnalyticsCard>
    </div>
  );
}

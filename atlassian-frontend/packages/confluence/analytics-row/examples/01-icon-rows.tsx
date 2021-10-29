import React from 'react';

import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import SearchIcon from '@atlaskit/icon/glyph/search';

import { AnalyticsRows } from '../src';
import { ExampleContainer } from '../src/ui/analytics-row/styled';
import { AnalyticsRowContent } from '../src/ui/analytics-row/types';

const viewMetric = {
  singular: 'view',
  plural: 'views',
};

const searchMetric = {
  singular: 'search',
  plural: 'searches',
};

const blog1: AnalyticsRowContent = {
  name: 'How to make a pb & j',
  value: 502,
  metric: viewMetric,
  atlaskitIcon: <Blog24Icon label={'How to make a pb & j'} />,
  showIcon: true,
  key: '10',
};

const page2: AnalyticsRowContent = {
  name: 'Cats vs dogs',
  value: 305,
  metric: viewMetric,
  atlaskitIcon: <Page24Icon label={'Cats vs dogs'} />,
  showIcon: true,
  key: '2',
};

const search3: AnalyticsRowContent = {
  name: 'Best pizza in NYC',
  value: 50,
  metric: searchMetric,
  atlaskitIcon: <SearchIcon label={'Best pizza in NYC'} />,
  showIcon: true,
  key: '3',
};

const content = [blog1, page2, search3];

export default function IconRows() {
  return (
    <div style={{ padding: 50, width: 400 }}>
      <ExampleContainer data-testid={'analytics-row'}>
        <AnalyticsRows content={content} showIcon={true} />
      </ExampleContainer>
    </div>
  );
}

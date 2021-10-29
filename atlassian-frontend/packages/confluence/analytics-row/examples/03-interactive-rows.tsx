import React from 'react';

import styled from 'styled-components';

import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';

import { AnalyticsRows } from '../src';
import { ExampleContainer } from '../src/ui/analytics-row/styled';
import {
  AnalyticsIconOnHoverDetails,
  AnalyticsRowContent,
} from '../src/ui/analytics-row/types';

export const Container = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
`;

const searchMetric = {
  singular: 'search',
  plural: 'searches',
};

const content1: AnalyticsRowContent = {
  name: 'How to book an event',
  subname: 'Documentation',
  hasSubname: true,
  value: 10402,
  metric: searchMetric,
  key: '10',
  showIcon: true,
  atlaskitIcon: <Blog24Icon label={'test'} />,
};

const content2: AnalyticsRowContent = {
  name: 'FAQ to provide users booking',
  subname: 'FAQs space',
  hasSubname: true,
  value: 30,
  metric: searchMetric,
  showIcon: true,
  key: '2',
  atlaskitIcon: <Blog24Icon label={'test'} />,
};

const content3: AnalyticsRowContent = {
  name: 'Setting customers up for success',
  subname: 'FAQs space',
  hasSubname: true,
  value: 50,
  metric: searchMetric,
  showIcon: true,
  key: '3',
  atlaskitIcon: <Page24Icon label={'test'} />,
};

const content4: AnalyticsRowContent = {
  name: 'Booking 101',
  subname: 'Team Clementine',
  hasSubname: true,
  value: 4,
  metric: searchMetric,
  showIcon: true,
  key: '4',
  atlaskitIcon: <Page24Icon label={'test'} />,
};

const content: AnalyticsRowContent[] = [content1, content2, content3, content4];

const analyticsIconOnHoverDetails: AnalyticsIconOnHoverDetails = {
  tooltipMessage: 'View page analytics',
};

export default function InteractiveRows() {
  return (
    <div style={{ padding: 50, width: 400 }}>
      <ExampleContainer data-testid={'analytics-row'}>
        <AnalyticsRows
          content={content}
          showIcon={true}
          analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
        />
      </ExampleContainer>
    </div>
  );
}

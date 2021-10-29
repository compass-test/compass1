import React, { ReactElement } from 'react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { CompassLink } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  FakeCompassDashboardLink,
  FakeCompassDocumentLink,
  FakeCompassOtherLink,
  FakeCompassProjectLink,
  FakeCompassRepositoryLink,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LinkView } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

const mockLinks: CompassLink[] = [
  FakeCompassDocumentLink(),
  FakeCompassRepositoryLink(),
  FakeCompassDashboardLink(),
  FakeCompassProjectLink(),
  FakeCompassOtherLink(),
];

export const ComponentLinks = () => {
  return (
    <div style={{ width: '600px' }}>
      <LinkView
        componentId="fake-component-id"
        componentName="Example Name"
        links={mockLinks}
      />
    </div>
  );
};

export const ComponentLinksEmpty = () => {
  return (
    <div style={{ width: '600px' }}>
      <LinkView
        componentId="fake-component-id"
        componentName="Example Name"
        links={[]}
      />
    </div>
  );
};

export const ComponentLinksDisabled = () => {
  return (
    <div style={{ width: '600px' }}>
      <LinkView
        componentId="fake-component-id"
        componentName="Example Name"
        links={mockLinks}
        dataManager={mockDataManager}
      />
    </div>
  );
};

export const ComponentLinksEmptyDisabled = () => {
  return (
    <div style={{ width: '600px' }}>
      <LinkView
        componentId="fake-component-id"
        componentName="Example Name"
        links={[]}
        dataManager={mockDataManager}
      />
    </div>
  );
};

import React from 'react';

import {
  CompassLink,
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  FakeCompassDashboardLink,
  FakeCompassProjectLink,
  getFakeLinks,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LinkList } from '../src/ui/link-section/link-list';

const mockLinks: CompassLink[] = [
  ...getFakeLinks(CompassLinkType.REPOSITORY, 5),
  FakeCompassDashboardLink(),
  FakeCompassProjectLink(),
];

const exampleType = CompassLinkType.REPOSITORY;

const LinkListExample = () => {
  return (
    <ApolloAutoMockProvider>
      <CompassTestProvider>
        <div
          style={{ width: '500px' }}
          data-testid="dragonfruit.components.examples.link-list"
        >
          <LinkList
            componentId="fake-component-id"
            componentName="fake-component-name"
            links={mockLinks}
            type={exampleType}
            maxLinks={MAX_COMPASS_LINKS_PER_SECTION}
          />
        </div>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export default LinkListExample;

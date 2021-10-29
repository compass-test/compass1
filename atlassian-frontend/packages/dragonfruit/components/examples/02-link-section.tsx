import React from 'react';

import {
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  getFakeLinks,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LinkSection } from '../src/ui/link-section';

const EmptyStateExample = () => {
  const linkType = CompassLinkType.REPOSITORY;
  const links = getFakeLinks(linkType, MAX_COMPASS_LINKS_PER_SECTION);

  return (
    <ApolloAutoMockProvider>
      <CompassTestProvider>
        <div
          style={{ width: '500px' }}
          data-testid="dragonfruit.components.examples.link-section.empty"
        >
          <LinkSection
            componentId="fake-component-id"
            componentName="fake-component-name"
            linkType={linkType}
            links={[]}
          />
        </div>
        <div
          style={{ width: '500px' }}
          data-testid="dragonfruit.components.examples.link-section.limit-reached"
        >
          <LinkSection
            componentId="fake-component-id"
            componentName="fake-component-name"
            linkType={linkType}
            links={links}
          />
        </div>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export default EmptyStateExample;

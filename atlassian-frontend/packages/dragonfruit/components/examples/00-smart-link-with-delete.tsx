import React from 'react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  getFakeLink,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { SmartLinkWithDelete } from '../src/ui/link-section/link-list/smart-link-with-delete';

const ExampleWithFailure = () => {
  const link = getFakeLink(CompassLinkType.REPOSITORY);
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <div
          style={{
            width: '700px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          data-testid="dragonfruit.components.examples.smart-link-with-delete"
        >
          <SmartLinkWithDelete
            componentId="id"
            componentName="CompassCatalog"
            link={link}
          />
        </div>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export default ExampleWithFailure;

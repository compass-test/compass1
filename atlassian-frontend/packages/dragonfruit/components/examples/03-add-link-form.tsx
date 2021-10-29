import React from 'react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { AddLinkForm } from '../src/ui/link-section/link-list/add-link-form';

const Example = () => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <div
          style={{ width: '500px' }}
          data-testid="dragonfruit.components.examples.add-link-form"
        >
          <AddLinkForm
            componentId="f08b9e52-117a-464d-8a2f-9d0dba6d6098"
            linkType={CompassLinkType.REPOSITORY}
            onCancel={() => {}}
            onSuccess={() => {}}
          />
        </div>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export default Example;

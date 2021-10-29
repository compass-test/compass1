import React, { ReactElement } from 'react';

import faker from 'faker';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { InlineName } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider locale="en">{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const NameExample = () => {
  return (
    <InlineName
      componentId={faker.random.uuid()}
      componentName={faker.random.words(3)}
    />
  );
};

export const DisabledNameExample = () => {
  return (
    <InlineName
      componentId={faker.random.uuid()}
      componentName={faker.random.words(3)}
      isDisabled={true}
    />
  );
};

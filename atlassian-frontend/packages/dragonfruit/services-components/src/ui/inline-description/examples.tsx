import React, { ReactElement } from 'react';

import faker from 'faker';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import InlineDescription from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider locale="en">{storyFn()}</CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const DescriptionExample = () => {
  return (
    <InlineDescription
      componentId={faker.random.uuid()}
      description={faker.random.words(10)}
      placeholder={faker.random.word()}
    />
  );
};

export const DisabledDescriptionExample = () => {
  return (
    <InlineDescription
      componentId={faker.random.uuid()}
      description={faker.random.words(10)}
      placeholder={faker.random.word()}
      isDisabled={true}
    />
  );
};

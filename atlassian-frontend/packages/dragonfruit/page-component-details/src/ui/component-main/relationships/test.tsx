import React from 'react';

import { render } from '@testing-library/react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Relationships } from './main';

describe('Relationships', () => {
  test('smoke test', async () => {
    const componentName = 'rando-comp-name';

    const MOCKED_COMPONENT = {
      id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
      name: componentName,
      type: CompassComponentType.SERVICE,
    };

    const { getByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <Relationships currentComponent={MOCKED_COMPONENT} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByText(componentName)).toBeDefined();
  });
});

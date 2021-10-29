import React from 'react';

import { Field } from '@atlaskit/form';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  fetchMockGet,
} from '@atlassian/dragonfruit-testing';

import { ComponentOption } from '../../../../controllers/components-add-team-owner';

import {
  MOCK_TEAM_ID,
  MOCKED_SEARCH_RESULTS,
  MOCKED_SEARCH_RESULTS_EMPTY,
  MOCKED_TEAM_REQUEST,
} from './mocks';

import { ComponentSelect } from './index';

export const ComponentSelectExample = () => {
  fetchMockGet(MOCKED_TEAM_REQUEST);

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
        <Field<ComponentOption> name="component">
          {({ fieldProps }) => (
            <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
          )}
        </Field>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const ComponentSelectExampleEmpty = () => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS_EMPTY}>
        <Field<ComponentOption> name="component">
          {({ fieldProps }) => (
            <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
          )}
        </Field>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const ComponentSelectExampleError = () => {
  return (
    <CompassTestProvider>
      <ApolloNetworkErrorProvider>
        <Field<ComponentOption> name="component">
          {({ fieldProps }) => (
            <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
          )}
        </Field>
      </ApolloNetworkErrorProvider>
    </CompassTestProvider>
  );
};

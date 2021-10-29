import React from 'react';

import { render } from '@testing-library/react';

import { useGetComponentDetailsQuery } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  FakeCompassEventQueryError,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentTags } from './index';

function ComponentTagController() {
  const { data } = useGetComponentDetailsQuery({
    variables: { id: 'abcdef' },
  });

  const component = data?.compass?.component;
  if (!component || component.__typename === 'QueryError') {
    return null;
  }
  return <ComponentTags component={component} />;
}

const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const appId = `ari:cloud:ecosystem::app/${appUuid}`;
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const bbIcon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png';

describe('LastDeployed', () => {
  it('can see deployment tag when deployment data is available', async () => {
    const mocks = {
      Extension: () => ({
        id: extensionId,
        properties: { title: 'Bitbucket app', icon: bbIcon },
      }),
      App: () => ({ id: appId }),
      CompassComponent: () => ({
        events: {
          __typename: 'CompassEventConnection',
          nodes: [
            {
              __typename: 'CompassDeploymentEvent',
              displayName: '#32',
              url: 'https://atlassian.com',
            },
          ],
        },
      }),
    };

    const { findByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentTagController />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const lastDeployedComponent = await findByTestId(
      'component-header.last-deployed',
    );
    expect(lastDeployedComponent).toBeInTheDocument();
  });

  it('does not display anything when deployment data is not available', async () => {
    const mocks = {
      Extension: () => ({
        id: extensionId,
        properties: { title: 'Bitbucket app', icon: bbIcon },
      }),
      App: () => ({ id: appId }),
      CompassComponent: () => ({
        events: null,
      }),
    };

    const { queryByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentTagController />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const lastDeployedComponent = await queryByTestId(
      'component-header.last-deployed',
    );
    expect(lastDeployedComponent).toBeNull();
  });

  it('does not display anything when a component has no events', async () => {
    const mocks = {
      Extension: () => ({
        id: extensionId,
        properties: { title: 'Bitbucket app', icon: bbIcon },
      }),
      App: () => ({ id: appId }),
      CompassComponent: () => ({
        events: {
          nodes: [],
        },
      }),
    };

    const { queryByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentTagController />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const lastDeployedComponent = await queryByTestId(
      'component-header.last-deployed',
    );
    expect(lastDeployedComponent).toBeNull();
  });

  it('does not display anything when a QueryErrorIsReturned', async () => {
    const mocks = {
      CompassEventsQueryResult: FakeCompassEventQueryError,
    };

    const { queryByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <ComponentTagController />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const lastDeployedComponent = await queryByTestId(
      'component-header.last-deployed',
    );
    expect(lastDeployedComponent).toBeNull();
  });
});

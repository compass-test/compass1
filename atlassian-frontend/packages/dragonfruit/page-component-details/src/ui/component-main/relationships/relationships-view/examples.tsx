import React from 'react';

import { boolean } from '@storybook/addon-knobs';

import {
  FlagMap,
  UI_DOWNSTREAM_DEPENDENCIES,
} from '@atlassian/dragonfruit-feature-flags';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_CONNECTED_COMPONENT,
  RELATIONSHIPS_QUERY_SUCCESS_RESOLVER,
} from '../../../../common/mocks';

import { RelationshipsView } from './index';

const mockCompassComponent = (component: Partial<CompassComponent>) => ({
  CompassComponent: () => ({
    ...component,
  }),
});

type ExampleArgs = {
  isManagedComponent: boolean;
  hasUpstreamDependencies: boolean;
  hasDownstreamDependencies: boolean;
  flags: FlagMap;
};

export const RelationshipViewExample = ({
  isManagedComponent = false,
  hasUpstreamDependencies = true,
  hasDownstreamDependencies = true,
  flags,
}: Partial<ExampleArgs>) => {
  const isManagedComponentKnobValue = boolean(
    'Component is externally managed',
    isManagedComponent,
  );
  const hasUpstreamDependenciesKnobValue = boolean(
    'Has upstream dependencies',
    hasUpstreamDependencies,
  );
  const hasDownstreamDependenciesKnobValue = boolean(
    'Has downstream dependencies',
    hasDownstreamDependencies,
  );

  const currentComponent = isManagedComponentKnobValue
    ? MOCKED_CONNECTED_COMPONENT
    : MOCKED_COMPONENT;

  return (
    <CompassTestProvider
      flags={{
        [UI_DOWNSTREAM_DEPENDENCIES]: true,
        ...flags,
      }}
    >
      <ApolloAutoMockProvider
        mocks={mockCompassComponent(currentComponent)}
        resolvers={RELATIONSHIPS_QUERY_SUCCESS_RESOLVER({
          hasInwardRelationships: hasDownstreamDependenciesKnobValue,
          hasOutwardRelationships: hasUpstreamDependenciesKnobValue,
        })}
      >
        <RelationshipsView currentComponent={currentComponent} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

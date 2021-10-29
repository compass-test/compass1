import React from 'react';

import {
  CompassComponentCommonDetailFragment,
  useGetComponentDetailsQuery,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ActivityFeed } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

type ActivityFeedWrapperProps = {
  children: (props: {
    currentComponent: CompassComponentCommonDetailFragment;
  }) => React.ReactNode;
};

function ActivityFeedWrapper(props: ActivityFeedWrapperProps) {
  const { data } = useGetComponentDetailsQuery({
    variables: { id: 'componentId' },
  });
  if (data?.compass?.component?.__typename !== 'CompassComponent') {
    return null;
  }
  return <>{props.children({ currentComponent: data.compass.component })}</>;
}

export const ActivityFeedView = () => {
  const mocks = {
    CompassEventsQueryResult: () => ({ __typename: 'CompassEventConnection' }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <ActivityFeedWrapper>
        {({ currentComponent }) => (
          <ActivityFeed currentComponent={currentComponent} />
        )}
      </ActivityFeedWrapper>
    </ApolloAutoMockProvider>
  );
};

export const ActivityFeedEmptyView = () => {
  const mocks = {
    CompassEventsQueryResult: () => ({ __typename: 'CompassEventConnection' }),
    CompassEventConnection: () => ({ nodes: [], edges: [] }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <ActivityFeedWrapper>
        {({ currentComponent }) => (
          <ActivityFeed currentComponent={currentComponent} />
        )}
      </ActivityFeedWrapper>
    </ApolloAutoMockProvider>
  );
};

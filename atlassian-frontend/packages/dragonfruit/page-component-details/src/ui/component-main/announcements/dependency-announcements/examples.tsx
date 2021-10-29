import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_ANNOUNCEMENTS,
  MOCKED_COMPONENT,
  MOCKED_DEPENDENCY_QUERY_DATA_WITH_ANNOUNCEMENTS,
  MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_ANNOUNCEMENTS,
  MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_DEPENDENCIES,
} from '../../../../common/mocks';

import { DependencyAnnouncements } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const AnnouncementList = () => {
  const mocks = {
    CompassComponent: () => ({ announcements: MOCKED_ANNOUNCEMENTS }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <div style={{ width: '1200px' }}>
        <DependencyAnnouncements
          currentComponent={MOCKED_COMPONENT}
          // @ts-ignore - "Types of property 'compass' are incompatible."
          data={MOCKED_DEPENDENCY_QUERY_DATA_WITH_ANNOUNCEMENTS}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};

export const NoAnnouncements = () => {
  const mocks = {
    CompassComponent: () => ({ announcements: [] }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <div style={{ width: '1200px' }}>
        <DependencyAnnouncements
          currentComponent={MOCKED_COMPONENT}
          // @ts-ignore - "Types of property 'compass' are incompatible."
          data={MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_ANNOUNCEMENTS}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};

export const NoDependencies = () => {
  return (
    <ApolloAutoMockProvider>
      <div style={{ width: '1200px' }}>
        <DependencyAnnouncements
          currentComponent={MOCKED_COMPONENT}
          // @ts-ignore - "Types of property 'compass' are incompatible."
          data={MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_DEPENDENCIES}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};

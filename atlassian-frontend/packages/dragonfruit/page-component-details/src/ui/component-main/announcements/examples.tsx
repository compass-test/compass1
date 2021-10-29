import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_ANNOUNCEMENTS,
  MOCKED_COMPONENT,
  MOCKED_DEPENDENCY_QUERY_DATA_WITH_ANNOUNCEMENTS,
  MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_ANNOUNCEMENTS,
} from '../../../common/mocks';

import { Announcements } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const AnnouncementsView = () => {
  const mocks = {
    CompassComponent: () => ({ announcements: MOCKED_ANNOUNCEMENTS }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <Announcements
        currentComponent={MOCKED_COMPONENT}
        // @ts-ignore - "Types of property 'compass' are incompatible."
        dependencyAnnouncementData={
          MOCKED_DEPENDENCY_QUERY_DATA_WITH_ANNOUNCEMENTS
        }
        unacknowledgedAnnouncementCount={1}
        onTabChange={() => action('change tab')}
        selectedTab=""
      />
    </ApolloAutoMockProvider>
  );
};

export const AnnouncementsViewEmptyState = () => {
  const mocks = {
    CompassComponent: () => ({ announcements: [] }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <Announcements
        currentComponent={MOCKED_COMPONENT}
        // @ts-ignore - "Types of property 'compass' are incompatible."
        dependencyAnnouncementData={
          MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_ANNOUNCEMENTS
        }
        unacknowledgedAnnouncementCount={0}
        onTabChange={() => action('change tab')}
        selectedTab=""
      />
    </ApolloAutoMockProvider>
  );
};

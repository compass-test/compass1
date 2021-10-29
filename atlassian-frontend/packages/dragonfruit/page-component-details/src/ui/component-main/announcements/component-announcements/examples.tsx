import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_ANNOUNCEMENTS,
  MOCKED_COMPONENT,
} from '../../../../common/mocks';

import { ComponentAnnouncements } from './index';

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
        <ComponentAnnouncements currentComponent={MOCKED_COMPONENT} />
      </div>
    </ApolloAutoMockProvider>
  );
};

export const EmptyState = () => {
  const mocks = {
    CompassComponent: () => ({ announcements: [] }),
  };

  return (
    <ApolloAutoMockProvider mocks={mocks}>
      <div style={{ width: '1200px' }}>
        <ComponentAnnouncements currentComponent={MOCKED_COMPONENT} />
      </div>
    </ApolloAutoMockProvider>
  );
};

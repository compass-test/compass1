import React, { ReactElement } from 'react';

import {
  CompassAnnouncement,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { DependencyAnnouncement } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const component = {
  id: 'a',
  name: 'Id gate keeper',
  type: CompassComponentType.SERVICE,
};

const acknowledgingComponent = {
  id: 'acknowledging-component-id',
};

const announcement: CompassAnnouncement = {
  id: 'test-id',
  title: 'Urgent depreciation notice',
  targetDate: new Date(2022, 2, 28),
  component: component as any,
  acknowledgements: [
    { component: acknowledgingComponent as any, hasAcknowledged: false },
  ],
  description:
    'We are deprecating the identity API. Goodluck with building your own authentication services.',
};

const announcementAcknowledged: CompassAnnouncement = {
  id: 'test-id',
  title: 'Urgent depreciation notice',
  targetDate: new Date(2022, 2, 28),
  component: component as any,
  acknowledgements: [
    { component: acknowledgingComponent as any, hasAcknowledged: true },
  ],
  description:
    'We are deprecating the identity API. Goodluck with building your own authentication services.',
};

const announcementNoAcknowledgementRequired: CompassAnnouncement = {
  id: 'test-id',
  title: 'Urgent depreciation notice',
  targetDate: new Date(2022, 2, 28),
  component: component as any,
  description:
    'We are deprecating the identity API. Goodluck with building your own authentication services.',
};

export const DependencyAnnouncementUnacknowledged = () => {
  return (
    <ApolloAutoMockProvider>
      <DependencyAnnouncement
        announcement={announcement}
        acknowledgingComponentId={'acknowledging-component-id'}
      />
    </ApolloAutoMockProvider>
  );
};

export const DependencyAnnouncementAcknowledged = () => {
  return (
    <ApolloAutoMockProvider>
      <DependencyAnnouncement
        announcement={announcementAcknowledged}
        acknowledgingComponentId={'acknowledging-component-id'}
      />
    </ApolloAutoMockProvider>
  );
};

export const DependencyAnnouncementNoAcknowledgement = () => {
  return (
    <ApolloAutoMockProvider>
      <DependencyAnnouncement
        announcement={announcementNoAcknowledgementRequired}
        acknowledgingComponentId={'acknowledging-component-id'}
      />
    </ApolloAutoMockProvider>
  );
};

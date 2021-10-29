import React, { ReactElement } from 'react';

import {
  CompassAnnouncement,
  CompassAnnouncementAcknowledgement,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCKED_COMPONENT } from '../../../../../common/mocks';

import { OwnAnnouncement } from './index';

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

const componentWithLongName = {
  id: 'component-with-long-name-id',
  name:
    'A component with a very very long name that has the same length as the limit of a hundred characters',
  type: CompassComponentType.SERVICE,
};

const mockAcknowledgements: CompassAnnouncementAcknowledgement[] = [];

for (const x of Array(8).keys()) {
  const mockComponent = { ...component, id: x.toString() };
  mockAcknowledgements.push({
    component: mockComponent as any,
    hasAcknowledged: Math.random() > 0.5,
  });
}

for (const x of Array(2).keys()) {
  const mockComponent = { ...componentWithLongName, id: x.toString() };
  mockAcknowledgements.push({
    component: mockComponent as any,
    hasAcknowledged: Math.random() > 0.5,
  });
}

const announcement: CompassAnnouncement = {
  id: 'test-id',
  title: 'Urgent depreciation notice',
  targetDate: '2023-09-06T01:41:13.998Z',
  component: component as any,
  acknowledgements: mockAcknowledgements,
  description:
    'We are deprecating the identity API. Goodluck with building your own authentication services.',
};

export const OwnAnnouncementSuccess = () => {
  return (
    <div style={{ width: '1200px' }}>
      <ApolloAutoMockProvider>
        <OwnAnnouncement
          announcement={announcement}
          component={MOCKED_COMPONENT}
        />
      </ApolloAutoMockProvider>
    </div>
  );
};

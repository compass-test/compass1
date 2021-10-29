import React from 'react';

import NotificationList from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints({
  delayedTotalError: true,
  withContentErrorCode: 500,
  withoutContentErrorCode: 500,
});

export default function Basic() {
  return (
    <Providers>
      <ExamplePopup>
        <NotificationList product="jira" testId="notification-list" />
      </ExamplePopup>
    </Providers>
  );
}

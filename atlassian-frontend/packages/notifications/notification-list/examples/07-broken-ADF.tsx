import React from 'react';

import NotificationList from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints({ brokenAdf: true });

export default function Skeleton() {
  return (
    <Providers>
      <ExamplePopup>
        <NotificationList product="jira" testId="notification-list" />
      </ExamplePopup>
    </Providers>
  );
}

import React from 'react';

import NotificationList from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints({ withoutContentTimeout: 20000, withContentTimeout: 20000 });

export default function Skeleton() {
  return (
    <Providers>
      <ExamplePopup>
        <NotificationList product="jira" testId="notification-list" />
      </ExamplePopup>
    </Providers>
  );
}

import React from 'react';

import NotificationList from '../src';

import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints();

export default function FullPage() {
  return (
    <Providers>
      <NotificationList product="jira" testId="notification-list" />
    </Providers>
  );
}

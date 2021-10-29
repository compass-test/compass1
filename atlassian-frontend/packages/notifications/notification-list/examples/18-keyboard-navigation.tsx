import React from 'react';

import NotificationList from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints();

export default function KeyboardNavigation() {
  return (
    <Providers>
      <ExamplePopup>
        <NotificationList
          product="jira"
          testId="notification-list"
          featureFlags={{
            enableKeyboardNavigation: true,
          }}
        />
      </ExamplePopup>
    </Providers>
  );
}

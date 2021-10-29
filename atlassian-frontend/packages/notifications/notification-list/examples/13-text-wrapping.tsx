import React, { useState } from 'react';

import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';

import NotificationList from '../src';

import { mockEndpoints } from './utils/mock-endpoints';
import { mockNotificationsVariousLengths } from './utils/mocks/mock-notifications-various-lengths';
import Providers from './utils/providers';

mockEndpoints({
  override: {
    mockDataDirectWithContent: mockNotificationsVariousLengths,
    mockDataWithContent: mockNotificationsVariousLengths,
  },
});

/**
 * This example is used for integration tests
 */
export default function IntegrationTest() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    // Add intl provider as all notification lists should have external intl context
    // Override the smart-card provider in examples to use staging
    <Providers>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        content={() => (
          <div
            data-test-id="popup-container"
            style={{ width: '516px', height: 'calc(100vh - 50px)' }}
          >
            <NotificationList product="jira" testId="notification-list" />
          </div>
        )}
        trigger={(triggerProps) => (
          <Button
            {...triggerProps}
            isSelected={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            style={{ margin: '10px' }}
          >
            {isOpen ? 'Close' : 'Open'}
          </Button>
        )}
      />
    </Providers>
  );
}

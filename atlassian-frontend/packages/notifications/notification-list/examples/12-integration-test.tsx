import React, { useState } from 'react';

import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';

import NotificationList from '../src';
import { buildConfluenceNotification } from '../src/common/mocks/notifications-factory';
import { ReadState } from '../src/common/types';

import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

const readNotificationIndexes = [
  6,
  8,
  9,
  10,
  13,
  14,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];

mockEndpoints({
  override: {
    mockDataDirectWithContent: {
      notifications: [...Array(25)].map((_, i) => {
        const readState = readNotificationIndexes.includes(i)
          ? ReadState.READ
          : ReadState.UNREAD;
        return buildConfluenceNotification({
          id: `mock_id_direct_${i}`,
          category: 'direct',
          readState,
        });
      }),
    },
    mockDataWithContent: {
      notifications: [...Array(25)].map((_, i) => {
        const readState = readNotificationIndexes.includes(i)
          ? ReadState.READ
          : ReadState.UNREAD;
        return buildConfluenceNotification({
          id: `mock_id_nd_${i}`,
          category: undefined,
          readState,
        });
      }),
    },
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

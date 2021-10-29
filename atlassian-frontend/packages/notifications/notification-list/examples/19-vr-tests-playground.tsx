import React, { useState } from 'react';

import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';

import NotificationList from '../src';

import { mockEndpoints } from './utils/mock-endpoints';
import {
  mockDataDirectWithContent,
  mockDataWithContent,
} from './utils/mocks/mock-with-mock-icons';
import Providers from './utils/providers';

mockEndpoints({
  withContentTimeout: 0,
  withoutContentTimeout: 0,
  override: { mockDataDirectWithContent, mockDataWithContent },
});

const containerSize = {
  height: 'calc(100vh - 250px)',
  minHeight: '80vh',
  width: '548px',
};

export default function Basic() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    // Add intl provider as all notification lists should have external intl context
    // Override the smart-card provider in examples to use staging
    <div style={{ ...containerSize, marginBottom: 100 }}>
      <Providers>
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom-start"
          content={() => (
            <div
              data-test-id="popup-container"
              style={{
                ...containerSize,
                width: '548px',
              }}
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
    </div>
  );
}

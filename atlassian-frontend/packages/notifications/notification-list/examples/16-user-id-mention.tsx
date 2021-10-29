import React, { useState } from 'react';

import Toggle from '@atlaskit/toggle';

import NotificationList from '../src';

import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints();

const containerSize = { height: 'calc(100vh - 250px)', minHeight: '80vh' };

export default function Basic() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const toggleUserId = () => {
    if (userId) {
      setUserId(undefined);
    } else {
      setUserId('5fbe3915aca10c006979aeec');
    }
  };

  return (
    <div style={{ ...containerSize, marginBottom: 100 }}>
      <div>
        <Toggle onChange={toggleUserId} isChecked={userId !== undefined} />
        <label style={{ marginRight: 12 }}>
          {`UserId currently: ${userId}`}
        </label>
      </div>
      <Providers>
        <NotificationList testId="notification-list" userId={userId} />
      </Providers>
    </div>
  );
}

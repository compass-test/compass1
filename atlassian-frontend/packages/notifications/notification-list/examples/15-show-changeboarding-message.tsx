import React from 'react';

import Toggle from '@atlaskit/toggle';

import { mockCoordinationClient } from '../helpers/coordination-client';
import NotificationList, { EngageKitContextProvider } from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints({ withoutContentTimeout: 1500, withContentTimeout: 2000 });

const coordinationClient = mockCoordinationClient();

const asPromise = <T,>(obj: T) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(obj), 7500);
  });
};

export default function ShowChangeboardingMessage() {
  const [clientAsPromise, setClientAsPromise] = React.useState(false);
  const renderNotifications = () => {
    if (clientAsPromise) {
      return (
        <Providers>
          <ExamplePopup>
            <EngageKitContextProvider
              coordinationClient={asPromise(coordinationClient)}
              changeBoardMessageId="MOCK_MESSAGE_ID"
            >
              <NotificationList product="jira" testId="notification-list" />
            </EngageKitContextProvider>
          </ExamplePopup>
        </Providers>
      );
    } else {
      return (
        <Providers>
          <ExamplePopup>
            <EngageKitContextProvider
              coordinationClient={coordinationClient}
              changeBoardMessageId="MOCK_MESSAGE_ID"
            >
              <NotificationList product="jira" testId="notification-list" />
            </EngageKitContextProvider>
          </ExamplePopup>
        </Providers>
      );
    }
  };
  const toggleClientAsPromise = () => {
    setClientAsPromise(!clientAsPromise);
  };
  return (
    <div>
      <div>
        <label style={{ marginRight: 12 }}>
          {clientAsPromise
            ? 'Currently passing the coordination client as a promise'
            : 'Currently passing the coordination client as a normal object'}
        </label>
        <Toggle onChange={toggleClientAsPromise} isChecked={clientAsPromise} />
      </div>
      {renderNotifications()}
    </div>
  );
}

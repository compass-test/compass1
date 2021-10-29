import React from 'react';

import NotificationList, {
  LoggerContextInterface,
  LoggerContextProvider,
} from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

mockEndpoints({ brokenAdf: true });

const logger: LoggerContextInterface = {
  captureException(error: Error, tags?: Record<string, string>) {
    console.log('Logger::captureException', error, tags);
  },
  captureMessage(message: string, tags?: Record<string, string>) {
    console.log('Logger::captureMessage', message, tags);
  },
};

export default function CustomLogger() {
  return (
    <LoggerContextProvider logger={logger}>
      <Providers>
        <ExamplePopup>
          <NotificationList product="jira" testId="notification-list" />
        </ExamplePopup>
      </Providers>
    </LoggerContextProvider>
  );
}

import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { NotificationsPopup } from './main';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const NotificationIndicatorButton = () => {
  return <NotificationsPopup />;
};

import React from 'react';

import { addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';

import NotificationList from '../src';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import Providers from './utils/providers';

addLocaleData(es);
mockEndpoints();

export default function Internationalisation() {
  return (
    <Providers locale="es">
      <ExamplePopup>
        <NotificationList product="jira" testId="notification-list" />
      </ExamplePopup>
    </Providers>
  );
}

import React from 'react';

import fetchMock from 'fetch-mock/cjs/client';
import { addLocaleData, IntlProvider } from 'react-intl';

import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';

export const DEFAULT_STARGATE_SERVICE_URL = '/gateway/api';
export const OPEN_INVITE_URL = '/invitations/v1/settings/open-invite';
export const DIRECT_ACCESS_URL =
  '/invitations/v1/settings/domain-enabled-signup-promotion';
export const INVITE_CAPABILITIES = '/invitations/capabilities';

const onAnalyticsEvent = (
  event: UIAnalyticsEvent,
  channel: string = 'channel=""',
) => {
  // eslint-disable-next-line no-console
  console.log(
    `AnalyticsEvent(${channel})\n\tpayload=%o\n\tcontext=%o`,
    event.payload,
    event.context,
  );
};

export const AnalyticsLogger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AnalyticsListener channel="*" onEvent={onAnalyticsEvent}>
      {children}
    </AnalyticsListener>
  );
};

export const withAnalyticsLogger = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <AnalyticsLogger>
    <WrappedComponent {...props} />
  </AnalyticsLogger>
);

// add more locale data if you want test other locales
const en = require('react-intl/locale-data/en');
addLocaleData(en);
const fr = require('react-intl/locale-data/fr');
addLocaleData(fr);

export const withIntlProvider = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <IntlProvider locale="en">
    <WrappedComponent {...props} />
  </IntlProvider>
);

function delay(ms: number) {
  if (ms === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PermissionProvider {
  [key: string]: (() => Promise<boolean>) | undefined;
}

const browsePermissionsProviders: PermissionProvider = {
  noValueProvided: undefined,
  returnFalse: () => delay(200).then(() => false),
  returnTrue: () => delay(200).then(() => true),
  throwError: () =>
    delay(200).then(() => {
      throw new Error();
    }),
};

export function mockBrowsePermissions(browsePermissions: string) {
  return browsePermissionsProviders[browsePermissions];
}

export const mockGetDirectAccessSetting = () => {
  fetchMock.get({
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
    response: {
      status: 200,
      body: {
        domain: 'atlassian.com',
        desPromotionEligible: 'true',
        role: 'ari:cloud:confluence::role/product/member',
      },
    },
    name: 'get-direct-access-setting',
    query: {
      setting: 'DIRECT_ACCESS',
    },
  });
};

export const mockGetOpenInviteSetting = () => {
  fetchMock.get({
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:confluence::site/test-cloud-id`,
    response: {
      status: 200,
      body: {
        mode: 'REQUEST_ACCESS',
      },
    },
  });
};

export const mockPutOpenInviteSetting = () => {
  fetchMock.put({
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}`,
    response: {
      status: 200,
      body: {
        mode: 'REQUEST_ACCESS',
      },
    },
  });
};

export const mockPostDirectAccessSetting = () => {
  fetchMock.post({
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
    response: {
      status: 204,
    },
    name: 'update-direct-access-setting',
  });
};

export function mockViralSettings() {
  mockGetDirectAccessSetting();
  mockGetOpenInviteSetting();
  mockPutOpenInviteSetting();
  mockPostDirectAccessSetting();
}

export const mockInviteCapabilities = (cloudId: string) => {
  fetchMock.get({
    matcher: `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=ari:cloud:platform::site/${cloudId}`,
    response: {
      status: 200,
      body: {
        directInvite: {
          mode: 'ANYONE',
          permittedResources: [
            `ari:cloud:jira-core::site/${cloudId}`,
            `ari:cloud:jira-software::site/${cloudId}`,
            `ari:cloud:jira-servicedesk::site/${cloudId}`,
            `ari:cloud:confluence::site/${cloudId}`,
          ],
        },
        invitePendingApproval: {
          mode: 'ANYONE',
          permittedResources: [
            `ari:cloud:jira-core::site/${cloudId}`,
            `ari:cloud:jira-software::site/${cloudId}`,
            `ari:cloud:jira-servicedesk::site/${cloudId}`,
            `ari:cloud:confluence::site/${cloudId}`,
          ],
        },
      },
    },
  });
};

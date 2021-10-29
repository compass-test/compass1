import fetchMock from 'fetch-mock/cjs/client';

import {
  DEFAULT_STARGATE_SERVICE_URL,
  DIRECT_ACCESS_URL,
  OPEN_INVITE_URL,
  HAVE_I_SEEN_IT_URL,
} from '../../src/clients/common';

export const mockGetDirectAccessSetting = () => {
  fetchMock.mock(
    `begin:${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`,
    (url: string) => {
      return {
        status: 200,
        body: {
          domain: url.split('domain=')[1].split('&')[0],
          desPromotionEligible: 'true',
          role: 'ari:cloud:jira-software::role/product/member',
        },
      };
    },
    {},
  );
};

export const mockGetOpenInviteSetting = () => {
  fetchMock
    .get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:jira-software::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`,
      response: {
        status: 200,
        body: {
          mode: 'REQUEST_ACCESS',
        },
      },
    })
    .get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:jira::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`,
      response: {
        status: 200,
        body: {
          mode: 'REQUEST_ACCESS',
        },
      },
    })
    .get({
      matcher: `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=ari:cloud:confluence::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`,
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

export const mockHISIGetFlag = (flagStatus: boolean) => {
  fetchMock.get({
    matcher: `begin:${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}`,
    response: {
      status: 200,
      body: {
        status: flagStatus,
      },
    },
    overwriteRoutes: true,
  });
};

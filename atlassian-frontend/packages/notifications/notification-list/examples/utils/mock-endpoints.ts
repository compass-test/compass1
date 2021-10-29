import subHours from 'date-fns/subHours';
import fetchMock from 'fetch-mock/cjs/client';

import { Notification, NotificationResponse } from '../../src/common/types';

import { mockDataDirectWithContent } from './mocks/mock-direct-with-content';
import { mockDataWithContent } from './mocks/mock-no-filter-with-content';

const defaultResponses = {
  mockDataWithContent,
  mockDataDirectWithContent,
};

// Used to update timestamps to be close to the current time
const baseTimestamp = Date.now();

const buildNotificationResponse = (
  params: URLSearchParams,
  override?: {
    mockDataWithContent: NotificationResponse;
    mockDataDirectWithContent: NotificationResponse;
  },
): NotificationResponse => {
  let notifications: Notification[] = [
    ...(override?.mockDataWithContent.notifications ??
      defaultResponses.mockDataWithContent.notifications),
  ];

  const category = params.get('category');
  if (category === 'direct') {
    notifications = [
      ...(override?.mockDataDirectWithContent.notifications ??
        defaultResponses.mockDataDirectWithContent.notifications),
    ];
  }

  notifications = notifications.map((notification, index) => {
    return {
      ...notification,
      timestamp: subHours(baseTimestamp, 5 * index).toISOString(),
      content: {
        ...notification.content,
        entity: {
          ...notification.content.entity,
          title: `Notification ${index + 1}`,
        },
      },
    };
  });

  // Filter out by read state
  const readStateFilter = params.get('readState');
  if (readStateFilter) {
    notifications = notifications.filter((notification) => {
      return notification.readState === readStateFilter;
    });
  }

  // Remove content if not requested
  const expandParam = params.get('expand');
  if (!expandParam) {
    notifications = createContentlessResponse(notifications);
  }

  let startIndex = 0;
  const limit = parseInt(params.get('limit') ?? '8', 10);
  if (params.has('continuationToken')) {
    const continuationToken = params.get('continuationToken');
    startIndex = notifications.findIndex(
      (notification) => notification.id === continuationToken,
    );
  }

  if (startIndex === -1) {
    return {
      notifications: [],
      continuationToken: undefined,
    };
  }

  notifications =
    startIndex === 0
      ? notifications.slice(0, limit)
      : notifications.slice(startIndex + 1, startIndex + limit + 1);

  const continuationToken =
    notifications.length === 0 || notifications.length < limit
      ? undefined
      : notifications[notifications.length - 1].id;
  return {
    notifications,
    continuationToken,
  };
};

const createContentlessResponse = (
  notifications: Notification[],
): Notification[] => {
  return notifications.map((notification) => ({
    ...notification,
    content: {
      ...notification.content,
      body: {
        items: [],
      },
    },
  }));
};

const injectBrokenAdfTransform = (notification: Notification): Notification => {
  return {
    ...notification,
    content: {
      ...notification.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'PRIMARY',
            document: {
              format: 'ADF',
              data: '"version":1,"type":',
            },
          },
        ],
      },
    },
  };
};

const removeAdfTransform = (notification: Notification): Notification => {
  return {
    ...notification,
    content: {
      ...notification.content,
      body: {
        items: [],
      },
    },
  };
};

type MockEndpointsArgs = {
  withoutContentErrorCode?: number;
  withContentErrorCode?: number;
  delayedTotalError?: boolean;
  breakComponentEntirely?: boolean;
  paginationLength?: number;
  withoutContentTimeout?: number;
  withContentTimeout?: number;
  brokenAdf?: boolean;
  removeAdf?: boolean;
  noNotifications?: boolean;
  override?: {
    mockDataWithContent: NotificationResponse;
    mockDataDirectWithContent: NotificationResponse;
  };
};

export const mockResponse = (
  response: any,
  responseDelay: number,
  requestUrl: string,
  method: string,
  options: object,
) => {
  // eslint-disable-next-line no-console
  console.log('Fetch Mock', {
    requestUrl,
    method,
    responseDelay,
    response,
    options,
  });

  return new Promise((res) => setTimeout(() => res(response), responseDelay));
};

export const resetMocks = () => {
  fetchMock.reset();
};

export const mockEndpoints = ({
  withoutContentErrorCode = undefined,
  withContentErrorCode = undefined,
  delayedTotalError = false,
  breakComponentEntirely = false,
  withoutContentTimeout = 500,
  withContentTimeout = 2500,
  brokenAdf = false,
  removeAdf = false,
  noNotifications = false,
  paginationLength,
  override,
}: MockEndpointsArgs = {}) => {
  // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration
  // Unmatched routes will fallback to the network
  fetchMock.config.fallbackToNetwork = false;

  fetchMock.get(
    new RegExp(`/gateway/api/notification-log/api/experimental/notifications`),
    (url: string, options: object) => {
      const urlParams = new URLSearchParams(url.split('?')[1]);

      // Optional override of the limit query param
      if (paginationLength) {
        urlParams.set('limit', `${paginationLength}`);
      }

      let response = buildNotificationResponse(urlParams, override);
      const isContentResponse = urlParams.has('expand');

      if (isContentResponse && brokenAdf) {
        response.notifications = response.notifications.map(
          injectBrokenAdfTransform,
        );
      }

      if (isContentResponse && removeAdf) {
        response.notifications = response.notifications.map(removeAdfTransform);
      }

      if (breakComponentEntirely) {
        response = { notifications: [{ borked: true }] } as any;
      }

      if (noNotifications) {
        response = {
          continuationToken: undefined,
          notifications: [],
        };
      }

      const isResponseError =
        (isContentResponse && withContentErrorCode && !delayedTotalError) ||
        (!isContentResponse && withoutContentErrorCode && !delayedTotalError) ||
        (urlParams.has('continuationToken') && delayedTotalError);

      const responseErrorCode = isContentResponse
        ? withContentErrorCode
        : withoutContentErrorCode;

      return mockResponse(
        isResponseError ? { status: responseErrorCode } : response,
        isContentResponse ? withContentTimeout : withoutContentTimeout,
        url,
        'GET',
        options,
      );
    },
    { method: 'GET', overwriteRoutes: false },
  );

  fetchMock.post(
    new RegExp(`/gateway/api/directory/graphql$`),
    async (url: string, options: object, request: Request) => {
      const body = await request.json();
      const userId = body.variables.userId;
      return mockResponse(
        {
          data: {
            User: {
              id: userId,
              isCurrentUser: false,
              status: 'active',
              statusModifiedDate: null,
              isBot: false,
              isNotMentionable: false,
              fullName: 'Profile Name',
              nickname: null,
              email: null,
              location: null,
              companyName: userId,
            },
          },
          extensions: { errorNumber: 0 },
        },
        withoutContentTimeout,
        url,
        'POST',
        options,
      );
    },
    { method: 'POST', overwriteRoutes: false },
  );

  fetchMock.post(
    new RegExp(`/gateway/api/notification-log/api/2/notifications/mark/bulk$`),
    (url: string, options: object) => {
      return mockResponse(
        { status: 204 },
        withoutContentTimeout,
        url,
        'POST',
        options,
      );
    },
    { method: 'POST', overwriteRoutes: false },
  );

  fetchMock.post(
    new RegExp(`/gateway/api/notification-log/api/2/notifications/mark/seen$`),
    (url: string, options: object) => {
      return mockResponse(
        { status: 204 },
        withoutContentTimeout,
        url,
        'POST',
        options,
      );
    },
    { method: 'POST', overwriteRoutes: false },
  );

  fetchMock.post(
    new RegExp(
      `/gateway/api/notification-log/api/2/notifications/mark\\?direct=`,
    ),
    (url: string, options: object) => {
      return mockResponse(
        { status: 202 },
        withoutContentTimeout,
        url,
        'POST',
        options,
      );
    },
    { method: 'POST', overwriteRoutes: false },
  );
};

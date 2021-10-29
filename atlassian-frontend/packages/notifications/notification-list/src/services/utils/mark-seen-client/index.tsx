import { RequestServiceOptions, utils } from '@atlaskit/util-service-support';

import { packageName, packageVersion } from '../../../common/constants';

export const markSeenApiRoute =
  '/gateway/api/notification-log/api/2/notifications/mark/seen';

export const markSeenNotificationsFetch = async (): Promise<void> => {
  const requestServiceOptions: RequestServiceOptions = {
    requestInit: {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'x-app-name': packageName,
        'x-app-version': packageVersion,
      },
      method: 'POST',
    },
    ignoreResponsePayload: true,
  };

  return await utils.requestService(
    { url: markSeenApiRoute },
    requestServiceOptions,
  );
};

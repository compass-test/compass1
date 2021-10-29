import { RequestServiceOptions, utils } from '@atlaskit/util-service-support';

import { packageName, packageVersion } from '../../../common/constants';
import { MarkRequestReadState } from '../../../common/types';

export const markBulkApiRoute =
  '/gateway/api/notification-log/api/2/notifications/mark/bulk';

export const markBulkNotificationsFetch = async (
  notificationIds: string[],
  toState: MarkRequestReadState,
): Promise<void> => {
  const requestServiceOptions: RequestServiceOptions = {
    requestInit: {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'x-app-name': packageName,
        'x-app-version': packageVersion,
      },
      method: 'POST',
      body: JSON.stringify({
        toState,
        ids: notificationIds,
      }),
    },
  };

  return await utils.requestService(
    { url: markBulkApiRoute },
    requestServiceOptions,
  );
};

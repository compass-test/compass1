import { RequestServiceOptions, utils } from '@atlaskit/util-service-support';

import { packageName, packageVersion } from '../../../common/constants';
import { MarkRequestReadState } from '../../../common/types';

export const markAllApiRoute =
  '/gateway/api/notification-log/api/2/notifications/mark';

export const markAllNotificationsReadFetch = async (
  direct: boolean,
  afterInclusive: string,
): Promise<void> => {
  const requestServiceOptions: RequestServiceOptions = {
    queryParams: {
      direct,
      afterInclusive,
    },
    requestInit: {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'x-app-name': packageName,
        'x-app-version': packageVersion,
      },
      method: 'POST',
      body: JSON.stringify({
        toState: MarkRequestReadState.READ,
      }),
    },
    ignoreResponsePayload: true,
  };

  return await utils.requestService(
    { url: markAllApiRoute },
    requestServiceOptions,
  );
};

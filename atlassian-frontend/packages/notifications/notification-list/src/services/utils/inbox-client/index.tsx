import { RequestServiceOptions, utils } from '@atlaskit/util-service-support';

import { packageName, packageVersion } from '../../../common/constants';
import {
  NotificationResponse,
  RequestCategory,
  RequestReadState,
} from '../../../common/types';

import { RequestExpand } from './types';

const fetchNotifications = async (
  categoryFilter: RequestCategory,
  readStateFilter: RequestReadState,
  expand: RequestExpand,
  locale: string,
  continuationToken?: string,
  limit: number = 8,
): Promise<NotificationResponse> => {
  const requestServiceOptions: RequestServiceOptions = {
    queryParams: {
      ...(categoryFilter !== RequestCategory.ANY && {
        category: categoryFilter,
      }),
      ...(readStateFilter !== RequestReadState.ANY && {
        readState: readStateFilter,
      }),
      ...(expand !== RequestExpand.NONE && { expand: expand }),
      ...(continuationToken && { continuationToken }),
      limit,
    },
    requestInit: {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'x-app-name': packageName,
        'x-app-version': packageVersion,
        'Accept-Language': locale,
      },
    },
  };

  return (await utils.requestService(
    { url: '/gateway/api/notification-log/api/experimental/notifications' },
    requestServiceOptions,
  )) as NotificationResponse;
};

export default fetchNotifications;

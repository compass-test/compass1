import { ALL_USERS_FROM_G_SYNC, ProductKeys } from '../../common/constants';
import { get, post } from '../../common/utils/fetch-request';
import { AtlRequestInit } from '../../common/utils/fetch-request/types';

import { Group, GroupBody, GroupResponse, ResponseHook } from './types';
import { getProductId } from './utils';

export const getGroupsBySiteId = async (
  cloudId: string,
  options: AtlRequestInit = {},
): Promise<GroupResponse> => {
  options.cloudId = cloudId;
  const url = `/gateway/api/adminhub/um/site/${cloudId}/groups`;
  const response = await get(url, options);
  return response;
};

export const getGroupsBySiteIdWrapper = async (
  cloudId: string,
): Promise<Group | undefined> => {
  const { groups }: GroupResponse = await getGroupsBySiteId(cloudId);
  return groups.find((group: Group) => group.name === ALL_USERS_FROM_G_SYNC);
};

export const grantGroupAccessByProduct = async (
  cloudId: string,
  productKey: ProductKeys,
  groups: string[],
  options: AtlRequestInit = {},
): Promise<ResponseHook> => {
  options.cloudId = cloudId;
  const url = `/gateway/api/adminhub/um/site/${cloudId}/product/${getProductId(
    productKey,
  )}/access-config/use`;
  const response = await post<GroupBody>(url, { groups }, options);
  return { statusCode: response };
};

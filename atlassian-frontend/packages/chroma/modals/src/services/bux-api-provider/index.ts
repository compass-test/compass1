import { ProductKeys } from '../../common/constants';
import { get, put } from '../../common/utils/fetch-request';
import { AtlRequestInit } from '../../common/utils/fetch-request/types';

import {
  Entitlement,
  EntitlementByProduct,
  EntitlementGroupResponse,
  ResponseHook,
  SelectEditionBody,
} from './types';
import { buildUrl } from './utils';

export const getEntitlementGroup = async (
  cloudId: string,
  options: AtlRequestInit = {},
): Promise<EntitlementGroupResponse> => {
  options.cloudId = cloudId;
  const url = `/billing/entitlement-group`;
  const response = await get(buildUrl(url, options), options);
  return response;
};

export const getEntitlementByProduct = async (
  cloudId: string,
): Promise<EntitlementByProduct> => {
  const { entitlements }: EntitlementGroupResponse = await getEntitlementGroup(
    cloudId,
  );
  return {
    jswEntitlementId: entitlements.find(
      (value: Entitlement) => value.productKey === ProductKeys.JIRA_SOFTWARE,
    )?.id,
    confEntitlementId: entitlements.find(
      (value: Entitlement) => value.productKey === ProductKeys.CONFLUENCE,
    )?.id,
  };
};

export const selectEdition = async (
  cloudId: string,
  entitlementId: string,
  edition: string,
  options: AtlRequestInit = {},
  estimateId: string | null = null,
): Promise<ResponseHook> => {
  options.cloudId = cloudId;
  const url = `/billing/entitlements/${entitlementId}/edition/${edition}`;
  const response = await put<SelectEditionBody>(
    buildUrl(url, options),
    {
      estimateId,
    },
    options,
  );
  return { statusCode: response };
};

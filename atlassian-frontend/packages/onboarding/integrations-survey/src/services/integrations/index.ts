import allSettled from 'promise.allsettled';

import {
  ATLASSIAN_ID_REQUIRED_ERROR_MESSAGE,
  EMCEE_PATH,
  EXISTS_STATUS_CODE,
  getIntegrationsValidStatusCodes,
  integrations,
  MANAGE_APP_REQUEST_PATH,
  MARKETPLACE_DEMAND_SERVICE_PATH,
} from '../../common/constants';
import { IntegrationInstallStatusMap } from '../../common/types';
import { getInstallRequestStatusUrlForIntegrationKey } from '../../common/utils';
import { getLocalStorage } from '../local-storage';
import { getUserSegmentationData } from '../user-segmentation';

import {
  AT_LEAST_ONE_KEY_IS_REQUIRED_ERROR_MESSAGE,
  defaultIntegrationKeys,
  MAX_INTEGRATION_KEYS,
  userSegmentationDataMapping,
} from './constants';
import {
  IntegrationInstallRequest,
  IntegrationInstallRequestResponse,
  SendIntegrationsInstallRequests,
} from './types';
import {
  INTEGRATION_LIST_LOCAL_STORAGE_KEY,
  isIntegrationInstalled,
  makeInstallStatusPromises,
} from './utils';

export const getIntegrationsFromLocalStorage = (aaid: string): string[] => {
  const localStorageValue = getLocalStorage().getItem(
    INTEGRATION_LIST_LOCAL_STORAGE_KEY(aaid),
  );
  let integrations = [];
  if (localStorageValue) {
    try {
      integrations = JSON.parse(localStorageValue);
    } catch (ignored) {}
  }
  return integrations;
};

export const saveIntegrationListToLocalStorage = (
  aaid: string,
  integrationKeys: string[],
) => {
  getLocalStorage().setItem(
    INTEGRATION_LIST_LOCAL_STORAGE_KEY(aaid),
    JSON.stringify(integrationKeys),
  );
};

export const createUserSegmentationBasedIntegrationList = async (
  onUserSegError?: (err: Error) => void,
) => {
  const userSegmentationData = await getUserSegmentationData(onUserSegError);
  return userSegmentationDataMapping[userSegmentationData.teamType];
};

export const sendIntegrationInstallRequest = async (
  integrationKey: string,
  productName: string,
  baseUrl: string,
  cloudId: string,
  aaid: string | null,
): Promise<void> => {
  // prevent fetch if no atlassian account id
  if (!aaid) {
    throw new Error(ATLASSIAN_ID_REQUIRED_ERROR_MESSAGE);
  }

  const url = getInstallRequestStatusUrlForIntegrationKey(
    integrationKey,
    productName,
    cloudId,
  );

  const payload: IntegrationInstallRequest = {
    appDetailsUrl: `${baseUrl}${EMCEE_PATH}/discover#!/discover/app/${integrationKey}`,
    appName: integrations[integrationKey].fullName,
    comment: `Hi, I'd like to try this app. I think it could be really useful to the team. Thanks!`,
    manageAppRequestUrl: `${baseUrl}${MANAGE_APP_REQUEST_PATH}`,
    userId: aaid,
  };
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status !== EXISTS_STATUS_CODE) {
    throw new Error(
      `Incorrect return status code (${response.status}) while fetching ${integrationKey}`,
    );
  }
};

export const getIntegrationsInstallRequestStatus = async (
  integrationsKeys: string[],
  productName: string,
  cloudId: string,
  aaid: string,
): Promise<IntegrationInstallRequestResponse[]> =>
  Promise.all(
    integrationsKeys.map((integrationKey) =>
      fetch(
        `${MARKETPLACE_DEMAND_SERVICE_PATH}/app-requests/product-name/${productName}/cloud-id/${cloudId}/app-key/${integrationKey}/status?userId=${aaid}`,
      ).then((r) => {
        if (!getIntegrationsValidStatusCodes.includes(r.status)) {
          throw new Error(
            `Incorrect return status code (${r.status}) while fetching ${integrationKey}`,
          );
        }
        return {
          key: integrationKey,
          requested: r.status === EXISTS_STATUS_CODE,
        };
      }),
    ),
  );

export const getIntegrationsInstallStatus = async (
  integrationsKeys: string[],
): Promise<IntegrationInstallStatusMap> => {
  if (!integrationsKeys || integrationsKeys.length < 1) {
    // reject if the usage is incorrect.
    return Promise.reject(
      new Error(AT_LEAST_ONE_KEY_IS_REQUIRED_ERROR_MESSAGE),
    );
  }

  const integrationsStatuses: IntegrationInstallStatusMap = {};

  const integrationsKeysToRetry: string[] = [];
  const integrationsPromises = makeInstallStatusPromises(integrationsKeys);

  // we run all promises in parallel and wait for them to be settled
  // in order to know what has to be retried
  await allSettled(integrationsPromises).then((results) =>
    results.forEach((result, i) => {
      // we initialise the result object for each integration.
      integrationsStatuses[integrationsKeys[i]] = {
        key: integrationsKeys[i],
      };
      if (result.status === 'rejected') {
        integrationsKeysToRetry.push(integrationsKeys[i]);
      } else if (
        !getIntegrationsValidStatusCodes.includes(result.value.status)
      ) {
        integrationsKeysToRetry.push(integrationsKeys[i]);
      } else {
        integrationsStatuses[
          integrationsKeys[i]
        ].installed = isIntegrationInstalled(result.value);
      }
    }),
  );

  const retriesPromises = makeInstallStatusPromises(integrationsKeysToRetry);

  // retry the failed calls once
  // we do not need to wait for all promises to be settled there
  await Promise.all(retriesPromises).then((results) =>
    results.forEach((result, i) => {
      if (!getIntegrationsValidStatusCodes.includes(result.status)) {
        throw new Error(
          `Incorrect return status code while fetching ${result.url}.`,
        );
      }
      integrationsStatuses[
        integrationsKeysToRetry[i]
      ].installed = isIntegrationInstalled(result);
    }),
  );

  return integrationsStatuses;
};

export const sendIntegrationsInstallRequests = ({
  productName,
  baseUrl,
  cloudId,
  aaid,
  integrationList,
}: SendIntegrationsInstallRequests) =>
  allSettled(
    integrationList.map((integrationKey) =>
      sendIntegrationInstallRequest(
        integrationKey,
        productName,
        baseUrl,
        cloudId,
        aaid,
      ),
    ),
  );

const limitIntegrationKeysToMaximum = (integrationKeys: string[]) => {
  return integrationKeys.slice(0, MAX_INTEGRATION_KEYS);
};

export const getIntegrations = async (
  aaid: string,
  onUserSegError?: (err: Error) => void,
): Promise<string[]> => {
  const integrationsFromLocalStorage = getIntegrationsFromLocalStorage(aaid);
  if (integrationsFromLocalStorage.length > 0) {
    // Local storage list should be read directly, and not modified here. If desired it would be sliced outside.
    return integrationsFromLocalStorage;
  }
  // Local storage is empty. Fetch user seg, and return the integrations list based on the user seg
  // In case of user seg returning undefined, return the default list

  const userSegmentationBasedIntegrationList = await createUserSegmentationBasedIntegrationList(
    onUserSegError,
  );

  if (userSegmentationBasedIntegrationList) {
    const integrationKeys = limitIntegrationKeysToMaximum(
      userSegmentationBasedIntegrationList,
    );

    saveIntegrationListToLocalStorage(aaid, integrationKeys);
    return integrationKeys;
  }

  return limitIntegrationKeysToMaximum(defaultIntegrationKeys);
};

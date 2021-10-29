import { useEffect, useState } from 'react';

import {
  ACTION_FAILED,
  ACTION_SUCCEEDED,
  APIType,
  MISSING_REQUIRED_FIELDS,
  ProductKeys,
} from '../../common/constants';
import { useOperationalEvent } from '../../common/utils/analytics-utils';
import { ProductSubscriptionChangeInfo } from '../../types';
import { selectEdition } from '../bux-api-provider';

import { SelectEditionHook } from './types';

export const useSelectEdition = (
  cloudId: string,
  subscriptions: ProductSubscriptionChangeInfo[],
  entitlementLoading: boolean,
  jswEntitlementId?: string,
  confEntitlementId?: string,
  analyticAttributes?: object,
): SelectEditionHook => {
  const [error, setError] = useState<string | undefined>();
  const [jswResponse, setJSWResponse] = useState<number | undefined>();
  const [confResponse, setCONFResponse] = useState<number | undefined>();
  // dummy hook to avoid multiple calls
  const [called, setCalled] = useState<boolean>(false);
  const jswProductSubscription = subscriptions.find(
    (subscription: ProductSubscriptionChangeInfo) =>
      subscription.product === ProductKeys.JIRA_SOFTWARE,
  );
  const confProductSubscription = subscriptions.find(
    (subscription: ProductSubscriptionChangeInfo) =>
      subscription.product === ProductKeys.CONFLUENCE,
  );

  const fireSelectEditionApiSuccessEvent = useOperationalEvent({
    action: ACTION_SUCCEEDED,
    actionSubject: APIType.BUX_SET_EDITION,
    attributes: analyticAttributes,
  });
  const fireSelectEditionApiErrorEvent = useOperationalEvent({
    action: ACTION_FAILED,
    actionSubject: APIType.BUX_SET_EDITION,
    attributes: analyticAttributes,
  });

  useEffect(() => {
    if (
      (!jswEntitlementId &&
        !entitlementLoading &&
        jswProductSubscription &&
        jswProductSubscription.upgradeRequired) ||
      (!confEntitlementId &&
        !entitlementLoading &&
        confProductSubscription &&
        confProductSubscription.upgradeRequired)
    ) {
      setError(MISSING_REQUIRED_FIELDS);
    }
    const triggerEditionChange = async () => {
      try {
        if (!called) {
          if (
            !jswResponse &&
            !entitlementLoading &&
            !error &&
            jswEntitlementId &&
            jswProductSubscription?.upgradeRequired
          ) {
            setCalled(true);
            const { statusCode: responseStatus } = await selectEdition(
              cloudId,
              jswEntitlementId,
              jswProductSubscription.upgradeEdition,
            );
            setJSWResponse(responseStatus);
            fireSelectEditionApiSuccessEvent({
              status: responseStatus,
              productKey: ProductKeys.JIRA_SOFTWARE,
            });
          }
          if (
            !jswResponse &&
            !confResponse &&
            !entitlementLoading &&
            !error &&
            confEntitlementId &&
            confProductSubscription?.upgradeRequired
          ) {
            setCalled(true);
            const { statusCode: responseStatus } = await selectEdition(
              cloudId,
              confEntitlementId,
              confProductSubscription.upgradeEdition,
            );
            setCONFResponse(responseStatus);
            fireSelectEditionApiSuccessEvent({
              status: responseStatus,
              productKey: ProductKeys.CONFLUENCE,
            });
          }
        }
      } catch (error) {
        setError(error.message);
        fireSelectEditionApiErrorEvent({
          errorMessage: error.message,
          errorStatus: error.status,
        });
      }
    };
    triggerEditionChange();
  }, [
    called,
    error,
    cloudId,
    jswResponse,
    confResponse,
    jswEntitlementId,
    confEntitlementId,
    entitlementLoading,
    jswProductSubscription,
    confProductSubscription,
    fireSelectEditionApiErrorEvent,
    fireSelectEditionApiSuccessEvent,
  ]);
  return { jswResponse, confResponse, error };
};

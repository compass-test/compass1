import { useEffect, useState } from 'react';

import {
  ACTION_FAILED,
  ACTION_SUCCEEDED,
  APIType,
  ProductKeys,
} from '../../common/constants';
import { useOperationalEvent } from '../../common/utils/analytics-utils';
import { ProductSubscriptionChangeInfo } from '../../types';
import { grantGroupAccessByProduct } from '../access-api-provider';

import { setPermissionHook } from './types';

export const useGrantGroupAccessByProduct = (
  cloudId: string,
  groups: string[] | undefined,
  subscriptions: ProductSubscriptionChangeInfo[],
  analyticAttributes?: object,
): setPermissionHook => {
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
  const fireGrantGroupAccessByProductApiSuccessEvent = useOperationalEvent({
    action: ACTION_SUCCEEDED,
    actionSubject: APIType.ACCESS_GRANT_GROUP_PERMISSION,
    attributes: analyticAttributes,
  });
  const fireGrantGroupAccessByProductApiErrorEvent = useOperationalEvent({
    action: ACTION_FAILED,
    actionSubject: APIType.ACCESS_GRANT_GROUP_PERMISSION,
    attributes: analyticAttributes,
  });

  useEffect(() => {
    const makeCall = async () => {
      if (called) {
        return;
      }
      setTimeout(async () => {
        try {
          if (jswProductSubscription && groups && !jswResponse && !error) {
            const { statusCode } = await grantGroupAccessByProduct(
              cloudId,
              ProductKeys.JIRA_SOFTWARE,
              groups,
            );
            setCalled(true);
            fireGrantGroupAccessByProductApiSuccessEvent({
              status: statusCode,
              productKey: ProductKeys.JIRA_SOFTWARE,
            });
            setJSWResponse(statusCode);
          }
          if (
            confProductSubscription &&
            groups &&
            !jswResponse &&
            !confResponse &&
            !error
          ) {
            const { statusCode } = await grantGroupAccessByProduct(
              cloudId,
              ProductKeys.CONFLUENCE,
              groups,
            );
            setCalled(true);
            fireGrantGroupAccessByProductApiSuccessEvent({
              status: statusCode,
              productKey: ProductKeys.CONFLUENCE,
            });
            setCONFResponse(statusCode);
          }
        } catch (error) {
          setError(error.message);
          fireGrantGroupAccessByProductApiErrorEvent({
            errorMessage: error.message,
            errorStatus: error.status,
          });
        }
        // wait 10 seconds here before granting access, allow edition update to be propagated.
      }, 10000);
    };
    makeCall();
  }, [
    cloudId,
    groups,
    error,
    called,
    jswResponse,
    confResponse,
    jswProductSubscription,
    confProductSubscription,
    fireGrantGroupAccessByProductApiSuccessEvent,
    fireGrantGroupAccessByProductApiErrorEvent,
  ]);
  return { jswResponse, confResponse, error };
};

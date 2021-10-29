import { useEffect } from 'react';

import { createHook, createStore } from 'react-sweet-state';

import {
  ACTION_FAILED,
  ACTION_SUCCEEDED,
  APIType,
} from '../../../common/constants';
import { useOperationalEvent } from '../../../common/utils/analytics-utils';
import { getEntitlementByProduct } from '../../../services/bux-api-provider';

import * as actions from './actions';
import { EntitlementState } from './actions/types';
import { Actions } from './types';

const initialState: EntitlementState = {
  entitlementLoading: true,
};

const Store = createStore<EntitlementState, Actions>({
  initialState,
  actions,
});

export const useEntitlementInfo = createHook<EntitlementState, Actions>(Store);

export const useEntitlementQuery = (
  cloudId: string,
  analyticsAttributes: Record<string, any>,
) => {
  const [entitlementState, { setEntitlementInfo }] = useEntitlementInfo();
  const { jswEntitlementId, confEntitlementId } = entitlementState;
  const fireGetEntitlementGroupApiSuccessEvent = useOperationalEvent({
    action: ACTION_SUCCEEDED,
    actionSubject: APIType.BUX_GET_ENTITLEMENT_GROUP,
    attributes: analyticsAttributes,
  });
  const fireGetEntitlementGroupApiErrorEvent = useOperationalEvent({
    action: ACTION_FAILED,
    actionSubject: APIType.BUX_GET_ENTITLEMENT_GROUP,
    attributes: analyticsAttributes,
  });
  useEffect(() => {
    const getEntitlement = async () => {
      try {
        if (!jswEntitlementId && !confEntitlementId) {
          const {
            jswEntitlementId,
            confEntitlementId,
          } = await getEntitlementByProduct(cloudId);
          setEntitlementInfo({
            jswEntitlementId,
            confEntitlementId,
            entitlementLoading: false,
            entitlementError: undefined,
          });
          fireGetEntitlementGroupApiSuccessEvent();
        }
      } catch (error) {
        setEntitlementInfo({
          confEntitlementId: undefined,
          jswEntitlementId: undefined,
          entitlementLoading: false,
          entitlementError: error.message,
        });
        fireGetEntitlementGroupApiErrorEvent({
          errorMessage: error.message,
          errorStatus: error.status,
        });
      }
    };
    getEntitlement();
    // This eslint-disable is temporary
    // and will be fixed along with the hook shortly
    // see go/chroma-exhaustive-deps for more info.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudId]);

  return entitlementState;
};

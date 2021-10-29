import { useEffect, useState } from 'react';

import { createHook, createStore } from 'react-sweet-state';

import {
  ACTION_FAILED,
  ACTION_SUCCEEDED,
  APIType,
  NO_USER_GROUP_FOR_G_SYNC,
} from '../../../common/constants';
import { useOperationalEvent } from '../../../common/utils/analytics-utils';
import { getGroupsBySiteIdWrapper } from '../../../services/access-api-provider';

import * as actions from './actions';
import { AccessGroupState } from './actions/types';
import { Actions } from './types';

const initialState: AccessGroupState = {
  groupLoading: true,
  groupError: undefined,
  groupId: undefined,
};

const Store = createStore<AccessGroupState, Actions>({
  initialState,
  actions,
});

export const useAccessGroupInfo = createHook<AccessGroupState, Actions>(Store);

export const useAccessGroupQuery = (
  cloudId: string,
  analyticsAttributes: Record<string, any>,
) => {
  const [accessGroupState, { setAccessGroupInfo }] = useAccessGroupInfo();
  const { groupId } = accessGroupState;
  // dummy hook to avoid multiple calls
  const [called, setCalled] = useState<boolean>(false);

  const fireGetGroupsBySiteIdWrapperSuccessEvent = useOperationalEvent({
    action: ACTION_SUCCEEDED,
    actionSubject: APIType.ACCESS_GET_GROUP_ID,
    attributes: analyticsAttributes,
  });
  const fireGetGroupsBySiteIdWrapperErrorEvent = useOperationalEvent({
    action: ACTION_FAILED,
    actionSubject: APIType.ACCESS_GET_GROUP_ID,
    attributes: analyticsAttributes,
  });
  useEffect(() => {
    const getAccessGroupIds = async () => {
      if (!groupId && !called) {
        try {
          // @ts-ignore
          const group = await getGroupsBySiteIdWrapper(cloudId);
          setCalled(true);
          if (group) {
            const { id: updatedGroupId } = group;
            setAccessGroupInfo({
              groupId: [updatedGroupId],
              groupLoading: false,
              groupError: undefined,
            });
            fireGetGroupsBySiteIdWrapperSuccessEvent();
          } else {
            setAccessGroupInfo({
              groupId: undefined,
              groupLoading: false,
              groupError: NO_USER_GROUP_FOR_G_SYNC,
            });
            fireGetGroupsBySiteIdWrapperErrorEvent({
              errorMessage: NO_USER_GROUP_FOR_G_SYNC,
            });
          }
        } catch (error) {
          setAccessGroupInfo({
            groupId: undefined,
            groupLoading: false,
            groupError: error.message,
          });
          fireGetGroupsBySiteIdWrapperErrorEvent({
            errorMessage: error.message,
            errorStatus: error.status,
          });
        }
      }
    };

    getAccessGroupIds();
    // This eslint-disable is temporary
    // and will be fixed along with the hook shortly
    // see go/chroma-exhaustive-deps for more info.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [called, groupId]);

  return accessGroupState;
};

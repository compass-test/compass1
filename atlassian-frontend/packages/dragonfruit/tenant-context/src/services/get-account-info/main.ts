import { useCallback } from 'react';

import { fetchJson, useGetRequestState } from '@atlassian/dragonfruit-utils';

import {
  AccountInfoData,
  AccountInfoResponse,
  AccountInfoState,
} from './types';

const useGetAccountInfo = (): AccountInfoState => {
  const request = useCallback(
    () =>
      fetchJson<AccountInfoResponse>(`/gateway/api/me`).then(
        ({ picture, name, email }) => {
          return {
            avatarUrl: picture,
            name,
            email,
          };
        },
      ),
    [],
  );

  return useGetRequestState<AccountInfoData>(request);
};

export default useGetAccountInfo;

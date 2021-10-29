import fetchMock from 'fetch-mock/cjs/client';

import { AccountInfoData } from './types';

export const mockGetAccountInfo = (
  { avatarUrl }: AccountInfoData,
  delay?: number,
) => {
  fetchMock.get(
    `/gateway/api/me`,
    {
      picture: avatarUrl,
    },
    { delay: delay ?? 0 },
  );
};

export const mockGetAccountInfoError = () => {
  fetchMock.get(`/gateway/api/me`, 400);
};

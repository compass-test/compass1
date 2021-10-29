import fetchMock from 'fetch-mock/cjs/client';

import { OptionIdentifier } from '@atlaskit/user-picker';
import { testRecommendationsData } from '@atlassian/ptc-test-utils';

export const USER_ENDPOINT = '/rest/api/3/user/bulk?accountId=';

export function mockGetUserPickerUser(accountId: string, timeout = 500) {
  return fetchMock.get(
    `${USER_ENDPOINT}${encodeURIComponent(accountId)}&maxResults=2000`,
    {
      values: [
        {
          // This transformation logic is taken care of in SmartUserPicker itself when hydrating user
          accountId: testRecommendationsData.recommendedUsers[0].id,
          displayName: testRecommendationsData.recommendedUsers[0].name,
          avatarUrls: {
            '16x16': testRecommendationsData.recommendedUsers[0].avatarUrl,
          },
        },
      ],
    },
    {
      delay: timeout,
      overwriteRoutes: false,
    },
  );
}

export const MOCK_DEFAULT_OWNER: OptionIdentifier = {
  id: testRecommendationsData.recommendedUsers[0].id,
  type: 'user',
};

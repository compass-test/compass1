import { wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  fetchMockGet,
  MOCK_ACCOUNT_ID,
  MOCK_ORG_ID,
} from '@atlassian/dragonfruit-testing';

import { mockGetTeamsOfUserFailure, mockGetTeamsOfUserSuccess } from './mocks';

import { useTeamsOfUser } from './index';

describe('useTeamsOfUsers', () => {
  it('should return a list of teams when successful', async () => {
    fetchMockGet(mockGetTeamsOfUserSuccess);
    const { result } = renderHook(() =>
      useTeamsOfUser(MOCK_ACCOUNT_ID, MOCK_ORG_ID),
    );
    await wait(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.data).toHaveProperty(
      ['entities', 0, 'displayName'],
      'Lodestone',
    );
  });

  it('should return an error when unsuccessful', async () => {
    fetchMockGet(mockGetTeamsOfUserFailure);
    const { result } = renderHook(() =>
      useTeamsOfUser(MOCK_ACCOUNT_ID, MOCK_ORG_ID),
    );
    await wait(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toBeTruthy();
  });
});

import { act, renderHook } from '@testing-library/react-hooks';

import {
  MOCK_ACCOUNT_ID,
  MOCK_CLOUD_ID,
  MOCK_WORKSPACE_ID,
} from '@atlassian/dragonfruit-testing';
import {
  readJsonFromLocalStorage,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

import { useOnboardingState } from './index';

jest.mock('@atlassian/dragonfruit-tenant-context', () => ({
  useTenantInfo: () => ({
    accountId: MOCK_ACCOUNT_ID,
    cloudId: MOCK_CLOUD_ID,
    workspaceId: MOCK_WORKSPACE_ID,
  }),
}));

jest.mock('@atlassian/dragonfruit-utils', () => ({
  writeToLocalStorage: jest.fn(),
  readJsonFromLocalStorage: jest.fn(() => true),
}));

const TEST_MESSAGE_ID = 'onboarding-modal-v1';
const TEST_KEY = `${TEST_MESSAGE_ID}:${MOCK_CLOUD_ID}:${MOCK_WORKSPACE_ID}:${MOCK_ACCOUNT_ID}`;

describe('useOnboardingState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should mark message as viewed in local storage', async () => {
    const { result } = renderHook(() => useOnboardingState(TEST_MESSAGE_ID));

    act(() => {
      result.current.markViewed();
    });

    expect(writeToLocalStorage).toBeCalledWith(TEST_KEY, true);
  });

  it('should read message state from local storage', async () => {
    const { result } = renderHook(() => useOnboardingState(TEST_MESSAGE_ID));
    var wasViewed: boolean = false;

    act(() => {
      wasViewed = result.current.wasViewed();
    });

    expect(readJsonFromLocalStorage).toBeCalledWith(TEST_KEY, false);
    expect(wasViewed).toEqual(true);
  });
});

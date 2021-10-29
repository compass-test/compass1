import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import { urlJiraCheck } from './utils';

import { useJiraCheckService } from './index';

test('should return isJiraAvailable false by default', async () => {
  const { result } = renderHook(() => useJiraCheckService());
  expect(result.current.isJiraAvailable).toBe(false);
});

test('should return isJiraAvailable true', async () => {
  fetchMock.mock(
    new RegExp(urlJiraCheck()),
    Promise.resolve({ permitted: true }),
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useJiraCheckService('test-cloud-id'),
  );

  await waitForNextUpdate();

  expect(result.current.isJiraAvailable).toBe(true);
});

import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import { mockGetAccountInfo, mockGetAccountInfoError } from './mocks';

import useGetAccountInfo from './index';

describe('useGetAccountInfo', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const renderTestHook = () => {
    return renderHook(() => useGetAccountInfo());
  };

  it('should init correctly', () => {
    mockGetAccountInfo(
      {
        avatarUrl: 'avatar/url.png',
        email: 'charlie@atlassian.com',
        name: 'charlie',
      },
      10,
    );

    const { result } = renderTestHook();

    expect(result.current).toEqual({
      data: undefined,
      error: undefined,
      loading: true,
    });
  });

  it('should return data if request succeeds', async () => {
    mockGetAccountInfo({
      avatarUrl: 'avatar/url.png',
      email: 'charlie@atlassian.com',
      name: 'charlie',
    });

    const { result, waitForNextUpdate } = renderTestHook();

    waitForNextUpdate().then(() =>
      expect(result.current).toEqual({
        data: {
          avatarUrl: 'avatar/url.png',
          email: 'charlie@atlassian.com',
          name: 'charlie',
        },
        error: undefined,
        loading: false,
      }),
    );
  });

  it('should return error if request fails', async () => {
    mockGetAccountInfoError();

    const { result, waitForNextUpdate } = renderTestHook();

    waitForNextUpdate().then(() =>
      expect(result.current).toEqual({
        data: undefined,
        error: expect.any(Error),
        loading: false,
      }),
    );
  });
});

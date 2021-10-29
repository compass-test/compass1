import React, { MutableRefObject } from 'react';

import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import debounce from 'lodash/debounce';

import type { CloudProduct } from '../../common/types';
import { searchApps } from '../../services/search-app';

import useSearchApps from './main';

jest.useFakeTimers();
// Mock the default base on the actual debounce
jest.mock('lodash/debounce');
jest.mock('../../services/search-app', () => ({ searchApps: jest.fn() }));
const searchAppsMock = searchApps as jest.Mock;
const debounceMock = debounce as jest.Mock;
const useRefSpy = jest.spyOn(React, 'useRef');

describe('useSearchApps()', () => {
  let result: RenderHookResult<
    { cloudProduct: CloudProduct },
    ReturnType<typeof useSearchApps>
  >;
  let abortRefSpy: MutableRefObject<AbortController>;
  let debounceRefSpy: MutableRefObject<ReturnType<typeof debounce>>;

  beforeAll(() => {
    // Use the actual debounce in the default test suit
    debounceMock.mockImplementation((...args) => {
      return jest.requireActual('lodash/debounce')(...args);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();

    result = renderHook(
      ({ cloudProduct }) => {
        return useSearchApps(cloudProduct);
      },
      { initialProps: { cloudProduct: 'jira' as CloudProduct } },
    );
    abortRefSpy = useRefSpy.mock.results[0].value;
    debounceRefSpy = useRefSpy.mock.results[1].value;
  });

  it('should return default value', () => {
    expect(result.result.current[0]).toEqual(false);
    expect(result.result.current[1]).toEqual([]);
    expect(result.result.current[2]).toEqual(expect.any(Function));
  });

  it('should cache the search callback between renders', () => {
    const onSearchApps = result.result.current[2];

    result.rerender();
    expect(result.result.current[2]).toBeDefined();
    expect(result.result.current[2]).toEqual(onSearchApps);
  });

  it('should avoid the additional debounce call between renders', () => {
    expect(debounceMock).toHaveBeenCalledTimes(1);
    result.rerender();
    expect(debounceMock).toHaveBeenCalledTimes(1);
  });

  it('should cache the returned debounce between renders', () => {
    expect(debounceRefSpy.current).toBeDefined();
    expect(debounceMock).toHaveNthReturnedWith(1, debounceRefSpy.current);
    result.rerender();
    expect(debounceRefSpy.current).toBeDefined();
    expect(debounceMock).toHaveNthReturnedWith(1, debounceRefSpy.current);
  });

  it('should update the search callback if cloudProduct changed', () => {
    const onSearchApps = result.result.current[2];

    result.rerender({ cloudProduct: 'confluence' });
    expect(result.result.current[2]).not.toEqual(onSearchApps);
  });

  it('should call the debounce again if cloudProduct changed', () => {
    expect(debounceMock).toHaveBeenCalledTimes(1);
    result.rerender({ cloudProduct: 'confluence' });
    expect(debounceMock).toHaveBeenCalledTimes(2);
  });

  it('should cancel debounce if cloudProduct changed', () => {
    const initialDebounce = debounceRefSpy.current;
    const cancelSpy = jest.spyOn(initialDebounce, 'cancel');

    expect(cancelSpy).not.toHaveBeenCalled();
    result.rerender({ cloudProduct: 'confluence' });
    expect(cancelSpy).toHaveBeenCalled();
    expect(debounceRefSpy.current).not.toEqual(initialDebounce);
  });

  describe('onSearchApps()', () => {
    beforeAll(() => {
      // Mock the lodash debounce to bypass the debounce time for the following test suit
      // jest fake timer won't work here because lodash debounce not only factor the timer but
      // also the Date object
      debounceMock.mockImplementation(fn => {
        return fn;
      });
    });

    beforeEach(() => {
      searchAppsMock.mockReset();
      jest.clearAllTimers();
    });

    it('should skip the search if input value is empty', () => {
      const onSearchApps = result.result.current[2];

      expect(searchAppsMock).not.toHaveBeenCalled();
      act(() => {
        onSearchApps('');
      });
      expect(searchAppsMock).not.toHaveBeenCalled();
    });

    it('should reset the apps if new input receive', async () => {
      const onSearchApps = result.result.current[2];

      searchAppsMock.mockResolvedValue([
        {
          key: 'key1',
          name: 'pdf app 1',
          logoUrl: 'http://google.com.au',
        },
        {
          key: 'key2',
          name: 'pdf app2',
          logoUrl: 'http://google.com.au',
        },
      ]);
      expect(result.result.current[1]).toHaveLength(0);

      // Do search
      act(() => {
        onSearchApps('pdf');
      });
      await searchAppsMock();
      expect(result.result.current[1]).toHaveLength(2);

      // Do search again
      act(() => {
        onSearchApps('new stuff');
      });
      expect(result.result.current[1]).toHaveLength(0);
    });

    it('should toggle the loading status while search', async () => {
      const onSearchApps = result.result.current[2];

      searchAppsMock.mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 1000);
        });
      });
      expect(result.result.current[0]).toEqual(false);

      // Expect
      act(() => {
        onSearchApps('pdf');
      });
      expect(result.result.current[0]).toEqual(true);

      // Resolve timer / promise
      await jest.runOnlyPendingTimers();

      // Expect
      expect(result.result.current[0]).toEqual(false);
    });

    it('should cancel search if a new input value comes', async () => {
      const onSearchApps = result.result.current[2];

      searchAppsMock.mockImplementation(() => {
        return new Promise(() => {});
      });
      expect(abortRefSpy.current).toBeUndefined();
      onSearchApps('pdf');
      expect(abortRefSpy.current).toBeDefined();
      const abortSpy = jest.spyOn(abortRefSpy.current, 'abort');
      const cachedAbort = abortRefSpy.current;

      act(() => {
        onSearchApps('pdf2');
      });
      expect(abortSpy).toHaveBeenCalledTimes(1);
      expect(abortRefSpy.current).toBeDefined();
      expect(abortRefSpy.current).not.toEqual(cachedAbort);
    });

    it('should handle successful search', async () => {
      const onSearchApps = result.result.current[2];

      searchAppsMock.mockResolvedValue([
        {
          key: 'key1',
          name: 'pdf app 1',
          logoUrl: 'http://google.com.au',
        },
        {
          key: 'key2',
          name: 'pdf app2',
          logoUrl: 'http://google.com.au',
        },
      ]);
      expect(result.result.current[1]).toEqual([]);

      // Act
      act(() => {
        onSearchApps('pdf');
      });
      await searchAppsMock();

      // Expect
      expect(result.result.current[1]).toHaveLength(2);
      expect(result.result.current[1][0]).toEqual({
        key: 'key1',
        name: 'pdf app 1',
        logoUrl: 'http://google.com.au',
      });
    });

    it('should handle failed search', async () => {
      const onSearchApps = result.result.current[2];

      // Preparing apps data before failed request
      searchAppsMock.mockResolvedValue([
        {
          key: 'key1',
          name: 'pdf app 1',
          logoUrl: 'http://google.com.au',
        },
        {
          key: 'key2',
          name: 'pdf app2',
          logoUrl: 'http://google.com.au',
        },
      ]);
      act(() => {
        onSearchApps('pdf');
      });
      await result.waitForNextUpdate();
      expect(result.result.current[1]).toHaveLength(2);

      // Failed second request
      searchAppsMock.mockRejectedValue(new Error());
      act(() => {
        onSearchApps('pdf');
      });
      await result.waitForNextUpdate();
      expect(result.result.current[1]).toEqual([]);
    });
  });
});

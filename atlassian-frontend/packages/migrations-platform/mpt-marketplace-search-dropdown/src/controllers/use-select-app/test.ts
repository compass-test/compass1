import React, { MutableRefObject } from 'react';

import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';

import { searchApp } from '../../services/search-app';

import useSelectApp from './main';

jest.useFakeTimers();
jest.mock('../../services/search-app', () => ({ searchApp: jest.fn() }));
const searchAppMock = searchApp as jest.Mock;
const useRefSpy = jest.spyOn(React, 'useRef');

describe('useSelectApp()', () => {
  let result: RenderHookResult<
    { defaultSelectedAppKey: string },
    ReturnType<typeof useSelectApp>
  >;

  beforeEach(() => {
    searchAppMock.mockReset();
    jest.clearAllMocks();
  });

  it('should skip the API request if no preselected app key', () => {
    result = renderHook(() => {
      return useSelectApp();
    });
    expect(result.result.current[0]).toEqual(false);
    expect(result.result.current[1]).toEqual(null);
    expect(result.result.current[2]).toEqual(expect.any(Function));
    expect(searchAppMock).not.toHaveBeenCalled();
  });

  it('should set the selected app with returned callback', () => {
    const expectApp = {
      key: 'boja.jira.pdf.com',
      name: 'Cool App',
      logoUrl: 'https://cool.app.com/cool.png',
      marketplaceUrl:
        'https://marketplace.atlassian.com/apps/5167/better-pdf-exporter-for-jira?hosting=cloud&tab=overview',
    };

    result = renderHook(() => {
      return useSelectApp();
    });
    expect(result.result.current[1]).toEqual(null);
    act(() => {
      result.result.current[2](expectApp);
    });
    expect(result.result.current[1]).toEqual(expectApp);
  });

  it('should request the API if preselected key provided', async () => {
    const expectAppKey = 'boja.jira.pdf.com';
    const expectApp = {
      key: expectAppKey,
      name: 'Cool App',
      logoUrl: 'https://cool.app.com/cool.png',
    };

    searchAppMock.mockResolvedValue(expectApp);
    result = renderHook(
      ({ defaultSelectedAppKey }) => {
        return useSelectApp(defaultSelectedAppKey);
      },
      { initialProps: { defaultSelectedAppKey: expectAppKey } },
    );
    const abortRefSpy: MutableRefObject<AbortController> =
      useRefSpy.mock.results[0].value;

    expect(result.result.current[0]).toEqual(true);
    expect(result.result.current[1]).toEqual(null);
    expect(result.result.current[2]).toEqual(expect.any(Function));
    expect(searchAppMock).toHaveBeenCalledTimes(1);
    expect(searchAppMock.mock.calls[0][0]).toBe(expectAppKey);
    expect(searchAppMock.mock.calls[0][1]).toEqual(expect.any(URLSearchParams));
    expect(searchAppMock.mock.calls[0][2]).toBeDefined();
    expect(searchAppMock.mock.calls[0][2]).toBe(abortRefSpy.current);
    await searchAppMock();
    expect(result.result.current[0]).toEqual(false);
    expect(result.result.current[1]).toEqual(expectApp);
  });

  it('should cancel the pending API request, and make a new request, when preselected key updated', () => {
    searchAppMock.mockImplementation(() => {
      return new Promise(() => {
        // Infinity promise
      });
    });
    result = renderHook(
      ({ defaultSelectedAppKey }) => {
        return useSelectApp(defaultSelectedAppKey);
      },
      { initialProps: { defaultSelectedAppKey: 'boja.jira.pdf.com' } },
    );
    const abortRefSpy: MutableRefObject<AbortController> =
      useRefSpy.mock.results[0].value;
    const abortSpy = jest.spyOn(abortRefSpy.current, 'abort');

    expect(abortSpy).not.toHaveBeenCalled();
    expect(result.result.current[0]).toEqual(true);
    result.rerender({ defaultSelectedAppKey: 'boja.confluence.pdf.com' });
    expect(abortSpy).toHaveBeenCalled();
    expect(result.result.current[0]).toEqual(true);
    expect(searchApp).toHaveBeenCalledTimes(2);
    expect(searchApp).toHaveBeenNthCalledWith(
      2,
      'boja.confluence.pdf.com',
      expect.anything(),
      expect.anything(),
    );
  });

  it('should cancel the pending API request, when manually set the selected app', () => {
    const overwrittenApp = {
      key: 'boja.jira.pdf.com',
      name: 'Cool Overwritten App',
      logoUrl: 'https://cool.app.com/cool.png',
      marketplaceUrl:
        'https://marketplace.atlassian.com/apps/5167/better-pdf-exporter-for-jira?hosting=cloud&tab=overview',
    };

    searchAppMock.mockImplementation(() => {
      return new Promise(() => {
        // Infinity promise
      });
    });
    result = renderHook(
      ({ defaultSelectedAppKey }) => {
        return useSelectApp(defaultSelectedAppKey);
      },
      { initialProps: { defaultSelectedAppKey: 'boja.jira.pdf.com' } },
    );
    const abortRefSpy: MutableRefObject<AbortController> =
      useRefSpy.mock.results[0].value;
    const abortSpy = jest.spyOn(abortRefSpy.current, 'abort');

    expect(abortSpy).not.toHaveBeenCalled();
    expect(result.result.current[0]).toEqual(true);
    act(() => {
      result.result.current[2](overwrittenApp);
    });
    expect(abortSpy).toHaveBeenCalled();
    expect(result.result.current[0]).toEqual(false);
    expect(searchApp).toHaveBeenCalledTimes(1);
    expect(result.result.current[1]).toEqual(overwrittenApp);
  });

  it('should cancel the pending API request, when component unmount', () => {
    searchAppMock.mockImplementation(() => {
      return new Promise(() => {
        // Infinity promise
      });
    });
    result = renderHook(
      ({ defaultSelectedAppKey }) => {
        return useSelectApp(defaultSelectedAppKey);
      },
      { initialProps: { defaultSelectedAppKey: 'boja.jira.pdf.com' } },
    );
    const abortRefSpy: MutableRefObject<AbortController> =
      useRefSpy.mock.results[0].value;
    const abortSpy = jest.spyOn(abortRefSpy.current, 'abort');

    expect(abortSpy).not.toHaveBeenCalled();
    expect(result.result.current[0]).toEqual(true);
    result.unmount();
    expect(abortSpy).toHaveBeenCalled();
  });

  it('should handle the request error', async () => {
    searchAppMock.mockRejectedValue('rejected');
    result = renderHook(
      ({ defaultSelectedAppKey }) => {
        return useSelectApp(defaultSelectedAppKey);
      },
      { initialProps: { defaultSelectedAppKey: 'boja.jira.pdf.com' } },
    );
    expect(result.result.current[0]).toEqual(true);
    await result.waitForNextUpdate();
    expect(result.result.current[0]).toEqual(false);
  });
});

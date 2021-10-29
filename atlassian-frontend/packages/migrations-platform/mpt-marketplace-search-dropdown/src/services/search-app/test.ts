// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { searchApp, searchApps } from './main';
import { searchAppMock, searchAppsMock } from './mocks';

fetchMock.enableMocks();

describe('searchApp()', () => {
  let abortCtrl: AbortController;
  let params: URLSearchParams;
  const expectAppKey = 'boja.jira.pdf.com';
  const expectApp = {
    key: expectAppKey,
    name: 'Issue Export to PDF HTML Word Documents',
    logoUrl:
      'https://marketplace-cdn.atlassian.com/files/images/4761c803-45da-4e8e-a052-5fc8b45fdd4e.png',
    marketplaceUrl:
      'https://marketplace.atlassian.com/apps/1218555/issue-export-to-pdf-html-word-documents?tab=overview',
  };

  beforeEach(() => {
    abortCtrl = new AbortController();
    params = new URLSearchParams();

    params.set('hosting', 'cloud');
    fetchMock.resetMocks();
  });

  it('should handle successful API response', async () => {
    const jsonMock = jest.fn().mockResolvedValue(searchAppMock);
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    const app = await searchApp(expectAppKey, params, abortCtrl);

    // Making sure the function args proxy to fetch correctly
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // toBeCalledWith doesn't do the reference check for the abort signal
    // that's why we need to `toBe` on each call argument to making sure it's the same signal we passed
    expect(global.fetch.mock.calls[0][0]).toBe(
      `https://marketplace.atlassian.com/rest/2/addons/${expectAppKey}?${params}`,
    );
    expect(global.fetch.mock.calls[0][1]?.signal).toBe(abortCtrl.signal);

    // Expect the result
    expect(app).toEqual(expectApp);
  });

  it('should handle 400 params error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 400 } as any);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      '400',
    );
  });

  it('should handle 404 params error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 404 } as any);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      '404',
    );
  });

  it('should handle 500 server error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 } as any);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      '500',
    );
  });

  it('should handle unknown request error', async () => {
    global.fetch.mockRejectedValue(new Error('Unknown error'));
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      'Unknown error',
    );
  });

  it('should handle response JSON parse error', async () => {
    const jsonMock = jest.fn().mockRejectedValue(new Error('JSON parse error'));
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      'JSON parse error',
    );
  });

  it('should handle response JSON structure mismatch error', async () => {
    const jsonMock = jest.fn();
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    const searchAppMockWithWrongType = {
      key: 1,
      name: 1,
      _embedded: { logo: { _links: { image: { href: 1 } } } },
      _links: { alternate: { href: 1 } },
    };

    // Handle if response body is null
    jsonMock.mockResolvedValue(null);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      'Marketplace API response type error',
    );

    // Handle if response addon type is mismatch
    jsonMock.mockResolvedValue(searchAppMockWithWrongType);
    await expect(searchApp(expectAppKey, params, abortCtrl)).rejects.toThrow(
      'Marketplace API response type error',
    );
  });
});

describe('searchApps()', () => {
  let abortCtrl: AbortController;
  let params: URLSearchParams;

  beforeEach(() => {
    abortCtrl = new AbortController();
    params = new URLSearchParams();

    params.set('application', 'jira');
    params.set('hosting', 'cloud');
    params.set('limit', '10');
    params.set('text', 'searchtext');
    fetchMock.resetMocks();
  });

  it('should handle successful API response', async () => {
    const jsonMock = jest.fn().mockResolvedValue(searchAppsMock);
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    const expectApp = {
      key: 'com.midori.jira.plugin.pdfview',
      name: 'Better PDF Exporter for Jira',
      logoUrl:
        'https://marketplace-cdn.atlassian.com/files/images/140b8fba-04d1-4a2a-82bd-91f5b001a7de.png',
      marketplaceUrl:
        'https://marketplace.atlassian.com/apps/5167/better-pdf-exporter-for-jira?hosting=cloud&tab=overview',
    };
    const apps = await searchApps(params, abortCtrl);

    // Making sure the function args proxy to fetch correctly
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // toBeCalledWith doesn't do the reference check for the abort signal
    // that's why we need to `toBe` on each call argument to making sure it's the same signal we passed
    expect(global.fetch.mock.calls[0][0]).toBe(
      `https://marketplace.atlassian.com/rest/2/addons?${params}`,
    );
    expect(global.fetch.mock.calls[0][1]?.signal).toBe(abortCtrl.signal);

    // Expect the result
    expect(apps).toHaveLength(10);
    expect(apps[0]).toEqual(expectApp);
  });

  it('should handle 400 params error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 400 } as any);
    await expect(searchApps(params, abortCtrl)).rejects.toThrow('400');
  });

  it('should handle 500 server error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 } as any);
    await expect(searchApps(params, abortCtrl)).rejects.toThrow('500');
  });

  it('should handle unknown request error', async () => {
    global.fetch.mockRejectedValue(new Error('Unknown error'));
    await expect(searchApps(params, abortCtrl)).rejects.toThrow(
      'Unknown error',
    );
  });

  it('should handle response JSON parse error', async () => {
    const jsonMock = jest.fn().mockRejectedValue(new Error('JSON parse error'));
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    await expect(searchApps(params, abortCtrl)).rejects.toThrow(
      'JSON parse error',
    );
  });

  it('should handle response JSON structure mismatch error', async () => {
    const jsonMock = jest.fn();
    global.fetch.mockResolvedValue({ ok: true, json: jsonMock } as any);
    const searchAppsMockWithWrongType = {
      _embedded: {
        addons: [
          {
            key: 1,
            name: 1,
            _embedded: { logo: { _links: { image: { href: 1 } } } },
            _links: { alternate: { href: 1 } },
          },
        ],
      },
    };

    // Handle if response body is null
    jsonMock.mockResolvedValue(null);
    await expect(searchApps(params, abortCtrl)).rejects.toThrow(
      'Cannot read property',
    );

    // Handle if response addon type is mismatch
    jsonMock.mockResolvedValue(searchAppsMockWithWrongType);
    await expect(searchApps(params, abortCtrl)).rejects.toThrow(
      'Marketplace API response type error',
    );
  });
});

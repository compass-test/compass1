import { getChildren, expandAttributes } from '.';
import { createPageListMockResponse } from './mocks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FetchMock } from 'jest-fetch-mock';

interface ExtendedGlobal extends NodeJS.Global {
  fetch: FetchMock;
}

const extendedGlobal: ExtendedGlobal = global;

const mockResponses = (responses: { [request: string]: Response }) => {
  extendedGlobal.fetch.mockImplementation((url) => {
    return typeof url === 'string'
      ? Promise.resolve(responses[url])
      : Promise.reject('unhandled type');
  });
};

describe('Confluence API', () => {
  const fetchListUrl = `/wiki/rest/api/content/AAA/child/page?limit=200&start=0&expand=${expandAttributes.join(
    ',',
  )}`;
  const fetchSpaceContentUrl = `/wiki/rest/api/space/SPACEKEY/content?limit=200&start=0&expand=${expandAttributes.join(
    ',',
  )}&depth=root`;

  afterEach(() => {
    extendedGlobal.fetch.resetMocks();
  });

  test('should return merged result from page list and page details API', async () => {
    const pageListResponse = createPageListMockResponse(3, { idPrefix: 'a1' });

    mockResponses({
      [fetchListUrl]: new Response(JSON.stringify(pageListResponse)),
    });

    const result = await getChildren('SPACEKEY', 'AAA');
    expect(result).toHaveLength(pageListResponse.results.length);
    expect(extendedGlobal.fetch).toHaveBeenCalledWith(fetchListUrl, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-atlassian-mau-ignore': 'true',
      },
    });

    result.forEach((samplePage: any, index: number) => {
      const expectedPageListResponse = pageListResponse.results[index];

      expect(samplePage.title).toEqual(expectedPageListResponse.title);
      expect(samplePage.childTypes).toEqual(
        expectedPageListResponse.childTypes,
      );
      expect(samplePage._links).toEqual({
        ...expectedPageListResponse._links,
        base: 'http://base.url/path', // injected _links.base
      });
      expect(samplePage.history).toEqual(expectedPageListResponse.history);
    });
  });

  test('should return merged result from page list and page details API - with pagination', async () => {
    const pageListResponse1 = createPageListMockResponse(200, {
      idPrefix: 'a1',
    });
    const pageListResponse2 = createPageListMockResponse(10, {
      idPrefix: 'b1',
    });
    const fetchListUrl1 = `/wiki/rest/api/content/AAA/child/page?limit=200&start=0&expand=${expandAttributes.join(
      ',',
    )}`;
    const fetchListUrl2 = `/wiki/rest/api/content/AAA/child/page?limit=200&start=200&expand=${expandAttributes.join(
      ',',
    )}`;

    mockResponses({
      [fetchListUrl1]: new Response(JSON.stringify(pageListResponse1)),
      [fetchListUrl2]: new Response(JSON.stringify(pageListResponse2)),
    });

    const result = await getChildren('SPACEKEY', 'AAA');
    expect(result).toHaveLength(
      pageListResponse1.results.length + pageListResponse2.results.length,
    );

    result.forEach((samplePage: any, index: number) => {
      const limit = 200;
      let samplePageListResponse;

      if (index < 200) {
        samplePageListResponse = pageListResponse1.results[index];
      } else {
        samplePageListResponse = pageListResponse2.results[index - limit];
      }

      expect(samplePage.title).toEqual(samplePageListResponse.title);
      expect(samplePage.childTypes).toEqual(samplePageListResponse.childTypes);
      expect(samplePage._links).toEqual({
        ...samplePageListResponse._links,
        base: 'http://base.url/path',
      });
      expect(samplePage.history).toEqual(samplePageListResponse.history);
    });
  });

  test('should return empty result when page list API return empty array and does not call the page details API', async () => {
    const pageListResponse = createPageListMockResponse(0, { idPrefix: 'a1' });

    mockResponses({
      [fetchListUrl]: new Response(JSON.stringify(pageListResponse)),
    });

    extendedGlobal.fetch.mockImplementation((url) => {
      switch (url) {
        case fetchListUrl:
          return Promise.resolve(
            new Response(JSON.stringify(pageListResponse)),
          );
      }
      return Promise.reject();
    });

    const result = await getChildren('SPACEKEY', 'AAA');
    expect(result).toHaveLength(0);
    expect(extendedGlobal.fetch).toBeCalledTimes(1);

    result.forEach((samplePage: any, index: number) => {
      const expectedPageListResponse = pageListResponse.results[index];

      expect(samplePage.title).toEqual(expectedPageListResponse.title);
      expect(samplePage.childTypes).toEqual(
        expectedPageListResponse.childTypes,
      );
      expect(samplePage._links).toEqual(expectedPageListResponse._links);
      expect(samplePage.history).toEqual(expectedPageListResponse.history);
    });
  });

  test('should throw error when pageList fails', async () => {
    mockResponses({
      [fetchListUrl]: new Response(undefined, { status: 500 }),
    });

    try {
      await getChildren('SPACEKEY', 'AAA');
    } catch (error) {
      expect(error.message).toEqual(
        'API responded with failure HTTP code: 500',
      );
    }
  });

  test('should throw error when fetch fails', async () => {
    const typeError = new TypeError('Failed to fetch');

    extendedGlobal.fetch.mockImplementation((url) => {
      switch (url) {
        case fetchListUrl:
          return Promise.reject(typeError);
      }
      return Promise.reject();
    });

    try {
      await getChildren('SPACEKEY', 'AAA');
    } catch (error) {
      expect(error).toEqual(typeError);
    }
  });

  test('should fetch root pages when a null pageId supplied', async () => {
    const spaceContentResponse = {
      page: createPageListMockResponse(3, { idPrefix: 'a1' }),
      _links: {
        base: 'http://base.url/path',
      },
    };

    mockResponses({
      [fetchSpaceContentUrl]: new Response(
        JSON.stringify(spaceContentResponse),
      ),
    });

    const result = await getChildren('SPACEKEY', null);
    expect(result).toHaveLength(spaceContentResponse.page.results.length);
    expect(extendedGlobal.fetch).toHaveBeenCalledWith(fetchSpaceContentUrl, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-atlassian-mau-ignore': 'true',
      },
    });

    result.forEach((samplePage: any, index: number) => {
      const expectedPageListResponse = spaceContentResponse.page.results[index];

      expect(samplePage.title).toEqual(expectedPageListResponse.title);
      expect(samplePage.childTypes).toEqual(
        expectedPageListResponse.childTypes,
      );
      expect(samplePage._links).toEqual({
        ...expectedPageListResponse._links,
        base: 'http://base.url/path',
      });
      expect(samplePage.history).toEqual(expectedPageListResponse.history);
    });
  });
});

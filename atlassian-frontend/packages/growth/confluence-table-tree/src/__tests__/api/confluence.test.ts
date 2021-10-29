import { getChildren } from '../../api/confluence';
import {
  createPageDetailsMockResponse,
  createPageListMockResponse,
} from '../../examples/mock-data';
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
  const fetchListUrl =
    '/wiki/rest/api/content/AAA/child/page?limit=200&start=0&expand=container,childTypes.page';
  const getFetchDetailsUrl = (contentIds: any[]) => {
    const path = '/wiki/rest/api/content/search';
    const cql = encodeURIComponent(`id in (${contentIds.join()})`);
    const params = `cql=${cql}&limit=200&expand=history.contributors.publishers.users,history.lastUpdated`;
    return `${path}?${params}`;
  };

  afterEach(() => {
    extendedGlobal.fetch.resetMocks();
  });

  test('should return merged result from page list and page details API', async () => {
    const pageListResponse = createPageListMockResponse(3, { idPrefix: 'a1' });
    const pageDetailsResponse = createPageDetailsMockResponse(3, {
      idPrefix: 'a1',
    });
    const fetchDetailsUrl = getFetchDetailsUrl(
      pageListResponse.results.map((page) => page.id),
    );

    mockResponses({
      [fetchListUrl]: new Response(JSON.stringify(pageListResponse)),
      [fetchDetailsUrl]: new Response(JSON.stringify(pageDetailsResponse)),
    });

    const result = await getChildren('AAA');
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
      const expectedPageDetailsResponse = pageDetailsResponse.results[index];

      expect(samplePage.title).toEqual(expectedPageListResponse.title);
      expect(samplePage.childTypes).toEqual(
        expectedPageListResponse.childTypes,
      );
      expect(samplePage._links).toEqual(expectedPageListResponse._links);
      expect(samplePage.contributors).toEqual(
        expectedPageDetailsResponse.history.contributors,
      );
      expect(samplePage.lastUpdated).toEqual(
        expectedPageDetailsResponse.history.lastUpdated,
      );
    });
  });

  test('should return merged result from page list and page details API - with pagination', async () => {
    const pageListResponse1 = createPageListMockResponse(200, {
      idPrefix: 'a1',
    });
    const pageListResponse2 = createPageListMockResponse(10, {
      idPrefix: 'b1',
    });
    const pageDetailsResponse1 = createPageDetailsMockResponse(200, {
      idPrefix: 'a1',
    });
    const pageDetailsResponse2 = createPageDetailsMockResponse(10, {
      idPrefix: 'b1',
    });
    const fetchListUrl1 =
      '/wiki/rest/api/content/AAA/child/page?limit=200&start=0&expand=container,childTypes.page';
    const fetchListUrl2 =
      '/wiki/rest/api/content/AAA/child/page?limit=200&start=200&expand=container,childTypes.page';
    const fetchDetailsUrl1 = getFetchDetailsUrl(
      pageListResponse1.results.map((page) => page.id),
    );
    const fetchDetailsUrl2 = getFetchDetailsUrl(
      pageListResponse2.results.map((page) => page.id),
    );

    mockResponses({
      [fetchListUrl1]: new Response(JSON.stringify(pageListResponse1)),
      [fetchListUrl2]: new Response(JSON.stringify(pageListResponse2)),
      [fetchDetailsUrl1]: new Response(JSON.stringify(pageDetailsResponse1)),
      [fetchDetailsUrl2]: new Response(JSON.stringify(pageDetailsResponse2)),
    });

    const result = await getChildren('AAA');
    expect(result).toHaveLength(
      pageListResponse1.results.length + pageListResponse2.results.length,
    );

    result.forEach((samplePage: any, index: number) => {
      const limit = 200;
      let samplePageListResponse;
      let samplePageDetailsResponse;

      if (index < 200) {
        samplePageListResponse = pageListResponse1.results[index];
        samplePageDetailsResponse = pageDetailsResponse1.results[index];
      } else {
        samplePageListResponse = pageListResponse2.results[index - limit];
        samplePageDetailsResponse = pageDetailsResponse2.results[index - limit];
      }

      expect(samplePage.title).toEqual(samplePageListResponse.title);
      expect(samplePage.childTypes).toEqual(samplePageListResponse.childTypes);
      expect(samplePage._links).toEqual(samplePageListResponse._links);
      expect(samplePage.contributors).toEqual(
        samplePageDetailsResponse.history.contributors,
      );
      expect(samplePage.lastUpdated).toEqual(
        samplePageDetailsResponse.history.lastUpdated,
      );
    });
  });

  test('should return empty result when page list API return empty array and does not call the page details API', async () => {
    const pageListResponse = createPageListMockResponse(0, { idPrefix: 'a1' });
    const pageDetailsResponse = createPageDetailsMockResponse(3, {
      idPrefix: 'a1',
    });

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

    const result = await getChildren('AAA');
    expect(result).toHaveLength(0);
    expect(extendedGlobal.fetch).toBeCalledTimes(1);

    result.forEach((samplePage: any, index: number) => {
      const expectedPageListResponse = pageListResponse.results[index];
      const expectedPageDetailsResponse = pageDetailsResponse.results[index];

      expect(samplePage.title).toEqual(expectedPageListResponse.title);
      expect(samplePage.childTypes).toEqual(
        expectedPageListResponse.childTypes,
      );
      expect(samplePage._links).toEqual(expectedPageListResponse._links);
      expect(samplePage.contributors).toEqual(
        expectedPageDetailsResponse.history.contributors,
      );
      expect(samplePage.lastUpdated).toEqual(
        expectedPageDetailsResponse.history.lastUpdated,
      );
    });
  });

  test('should throw error when pageList fails', async () => {
    const pageDetailsResponse = createPageDetailsMockResponse(3, {
      idPrefix: 'a1',
    });
    const fetchDetailsUrl = getFetchDetailsUrl(
      pageDetailsResponse.results.map((page) => page.id),
    );

    mockResponses({
      [fetchListUrl]: new Response(undefined, { status: 500 }),
      [fetchDetailsUrl]: new Response(JSON.stringify(pageDetailsResponse)),
    });

    try {
      await getChildren('AAA');
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
      await getChildren('AAA');
    } catch (error) {
      expect(error).toEqual(typeError);
    }
  });

  test('should throw error when pageDetails fails', async () => {
    const pageListResponse = createPageListMockResponse(3, { idPrefix: 'a1' });
    const fetchDetailsUrl = getFetchDetailsUrl(
      pageListResponse.results.map((page) => page.id),
    );

    mockResponses({
      [fetchListUrl]: new Response(JSON.stringify(pageListResponse)),
      [fetchDetailsUrl]: new Response(undefined, { status: 404 }),
    });

    try {
      await getChildren('AAA');
    } catch (error) {
      expect(error.message).toEqual(
        'API responded with failure HTTP code: 404',
      );
    }
  });
});

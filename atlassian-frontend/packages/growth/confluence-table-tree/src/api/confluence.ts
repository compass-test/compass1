// TODO remove this file once fully productionised
import { PageData } from '../types';

interface PageAttribute {
  id: string;
  history: any;
}

interface PageAttributesArgs {
  contentIds: string[];
  attributes: string;
  limit: number;
}

interface RecursiveFetchArgs {
  currentFetch: Promise<any>;
  terminatingFn: (response: any) => boolean;
  getNextFetch: (args: any) => Promise<any>;
  accumulator?: any[];
}

const fetchOptions: any = {
  headers: {
    'Content-Type': 'application/json',
    'x-atlassian-mau-ignore': 'true',
  },
  credentials: 'same-origin',
};

const recursiveFetch = ({
  currentFetch,
  terminatingFn,
  getNextFetch,
  accumulator = [],
}: RecursiveFetchArgs): Promise<any> =>
  currentFetch.then((response) => {
    const { results } = response;
    const mergedResult = [...accumulator, ...results];

    return terminatingFn(response)
      ? Promise.resolve(mergedResult)
      : recursiveFetch({
          currentFetch: getNextFetch(response),
          terminatingFn,
          getNextFetch,
          accumulator: mergedResult,
        });
  });

const handleFetchResponse = (response: any) => {
  if (response.ok) {
    return response.json();
  }

  const error = new Error(
    `API responded with failure HTTP code: ${response.status}`,
  );
  throw error;
};

const fetchChildPages = async (
  contentId: string,
  start: number,
  limit: number,
): Promise<any> => {
  const path = `/wiki/rest/api/content/${contentId}/child/page`;
  const params = `limit=${limit}&start=${start}&expand=container,childTypes.page`;
  const url = `${path}?${params}`;

  return fetch(url, fetchOptions).then(handleFetchResponse);
};

const fetchPageAttributes = async ({
  contentIds,
  attributes,
  limit,
}: PageAttributesArgs): Promise<any> => {
  const path = '/wiki/rest/api/content/search';
  const cql = encodeURIComponent(`id in (${contentIds.join()})`);
  const params = `cql=${cql}&limit=${limit}&expand=${attributes}`;
  const url = `${path}?${params}`;

  return fetch(url, fetchOptions).then(handleFetchResponse);
};

const getChildPages = (contentId: string, limit: number): Promise<any> =>
  recursiveFetch({
    currentFetch: fetchChildPages(contentId, 0, limit),
    terminatingFn: ({ size }) => size < limit,
    getNextFetch: ({ start }) =>
      fetchChildPages(contentId, start + limit, limit),
  });

const mergePageDetails = ([pageList, pageAttributes]: any) =>
  pageList.map((page: PageData) => {
    const { history = {} } =
      pageAttributes.find(
        (pageWithAttribute: PageAttribute) => pageWithAttribute.id === page.id,
      ) ?? {};
    const { lastUpdated, contributors } = history;

    return {
      ...page,
      lastUpdated,
      contributors,
    };
  });

const getPageAttributes = (
  pages: Array<PageData>,
  limit: number,
): Promise<any> => {
  let start = 0;
  const attributes =
    'history.contributors.publishers.users,history.lastUpdated';
  const allContentIds: Array<string> = pages.map((page) => page.id);
  const totalPages = allContentIds.length;
  const incrementStart = () => {
    start += limit;
  };
  const getNextPageAttributes = () => {
    incrementStart();
    const end = start + limit < totalPages ? start + limit : totalPages;
    const contentIds = allContentIds.slice(start, end);
    return fetchPageAttributes({ contentIds, attributes, limit });
  };

  const terminatingFn = () => start + limit >= totalPages;

  return recursiveFetch({
    currentFetch: fetchPageAttributes({
      contentIds: allContentIds.slice(0, limit),
      attributes,
      limit,
    }),
    terminatingFn,
    getNextFetch: getNextPageAttributes,
  }).then((pageDetails) => [pages, pageDetails]);
};

const getChildren = async (contentId: string): Promise<any> => {
  const limit = 200;

  const childPages = await getChildPages(contentId, limit);

  if (childPages.length === 0) {
    return [];
  }

  const currentChildPages = childPages.filter(
    (childPage: any) => childPage.status === 'current',
  );

  const childPageAttributes = await getPageAttributes(currentChildPages, limit);
  const mergedDetails = mergePageDetails(childPageAttributes);
  return mergedDetails;
};

export { getChildren };

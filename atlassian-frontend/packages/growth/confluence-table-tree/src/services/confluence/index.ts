import {
  ChildPagesResponse,
  PageDataWithAncestors,
  Links,
  PageData,
  PaginatedResults,
  RecursiveFetchArgs,
  SearchResponse,
  SearchResult,
  SpaceContentResponse,
  WithLinks,
  WithLinksBase,
} from '../../types';

const fetchOptions: any = {
  headers: {
    'Content-Type': 'application/json',
    'x-atlassian-mau-ignore': 'true',
  },
  credentials: 'same-origin',
};

export const expandAttributes = [
  'childTypes.page',
  'history.contributors.publishers.users',
  'history.lastUpdated',
  'metadata.frontend.collabService',
];

export const withDraftsExpandAttributes = [
  'childTypes.page',
  'metadata.frontend.collabService',
  'version',
  'version.collaborators.users',
  'extensions',
  'ancestors',
];

const SEARCH_API_URL = '/wiki/rest/api/content/search';
const ANCESTOR = 'ancestor';
const SPACE = 'space';

const draftSearchParams = (
  primaryType: string,
  primaryId: string,
  limit: number,
  start: number,
) =>
  new URLSearchParams({
    cql: `${primaryType}=${primaryId} AND type in (page)`,
    cqlcontext: '{"contentStatuses":["draft"]}',
    limit: `${limit}`,
    start: `${start}`,
    expand: withDraftsExpandAttributes.join(','),
  }).toString();

const constructChildPagesResponseFromSpaceContentResponse = ({
  page,
  _links,
}: SpaceContentResponse): ChildPagesResponse => ({
  ...page,
  _links,
});

const injectLinksBase = <T extends WithLinks<Links>>(
  page: T,
  base: string,
): WithLinksBase<T> => ({
  ...page,
  _links: {
    ...page._links,
    base,
  },
});

const normaliseSearchResult = (page: SearchResult): SearchResult => {
  const {
    version: {
      friendlyWhen,
      number,
      collaborators: { users },
    },
  } = page;
  return {
    ...page,
    history: {
      contributors: { publishers: { users } },
      lastUpdated: {
        friendlyWhen,
        number,
      },
    },
  };
};

const injectLinksBaseToChildPagesResponse = ({
  results,
  _links: { base },
}: ChildPagesResponse) => results.map((page) => injectLinksBase(page, base));

const statusSortValues: { [index: string]: number } = {
  current: 0,
  draft: 1,
};

const typeSortValues: { [index: string]: number } = {
  number: 0,
  string: 1,
};

const compareByIdStatusAndPosition = (
  { id: idA, status: statusA, extensions: { position: positionA } }: PageData,
  { id: idB, status: statusB, extensions: { position: positionB } }: PageData,
) => {
  // If they have the same id, they are the same page
  if (idA === idB) {
    return 0;
  }
  const statusSort = statusSortValues[statusA] - statusSortValues[statusB];
  // We show drafts after published pages
  if (statusSort !== 0) {
    return statusSort;
  }
  const typeSort =
    typeSortValues[typeof positionA] - typeSortValues[typeof positionB];
  // We get the string "none" in the position field, which should be sorted under the numerical values
  if (typeSort !== 0) {
    return typeSort;
  }
  //
  if (typeof positionA === 'number' && typeof positionB === 'number') {
    return positionA - positionB;
  }
  // Try to parse the id's to numbers and compare them, other wise keep the original sort order
  return parseInt(idA) - parseInt(idB) || 1;
};

const getChildrenForTypeWithDrafts = async (
  primaryType: string,
  primaryId: string | null,
  limit: number,
): Promise<false | PageDataWithAncestors[]> =>
  primaryId !== null &&
  (await recursivelyFetchPages(
    limit,
    (start, limit) =>
      searchChildPagesWithDrafts(primaryType, primaryId, start, limit),
    ({ results, _links: { base } }) =>
      results
        .filter((page) => page.status === 'draft')
        .map<PageDataWithAncestors>((page) =>
          injectLinksBase(normaliseSearchResult(page), base),
        )
        .sort(compareByIdStatusAndPosition),
  ));

const recursiveFetch = <ResponseType extends {}, ResultType extends {}>({
  currentFetch,
  terminatingFn,
  getNextFetch,
  getResults,
  accumulator = [],
}: RecursiveFetchArgs<ResponseType, ResultType>): Promise<ResultType[]> =>
  currentFetch.then((response) => {
    const results = getResults(response);
    const mergedResult = [...accumulator, ...results];

    return terminatingFn(response)
      ? Promise.resolve(mergedResult)
      : recursiveFetch<ResponseType, ResultType>({
          currentFetch: getNextFetch(response),
          terminatingFn,
          getNextFetch,
          getResults,
          accumulator: mergedResult,
        });
  });

const handleFetchResponse = <ResponseType extends {}>(
  response: Response,
): Promise<ResponseType> => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`API responded with failure HTTP code: ${response.status}`);
};

const fetchPages = async <T>(url: string) => {
  const response = await fetch(url, fetchOptions);
  return handleFetchResponse<T>(response);
};

export const getPage = async (
  contentId: string,
  status: 'draft' | 'current',
): Promise<PageDataWithAncestors> => {
  const page = await fetchPages<WithLinksBase<SearchResult>>(
    `/wiki/rest/api/content/${contentId}?${new URLSearchParams({
      status,
      expand: withDraftsExpandAttributes.join(','),
    }).toString()}`,
  );
  return normaliseSearchResult(page) as WithLinksBase<SearchResult>;
};

const searchChildPagesWithDrafts = async (
  primaryType: string,
  primaryId: string,
  start: number,
  limit: number,
): Promise<SearchResponse> => {
  return fetchPages(
    `${SEARCH_API_URL}?${draftSearchParams(
      primaryType,
      primaryId,
      limit,
      start,
    )}`,
  );
};

const fetchChildPages = async (
  contentId: string,
  start: number,
  limit: number,
): Promise<ChildPagesResponse> => {
  const path = `/wiki/rest/api/content/${contentId}/child/page`;
  const params = `limit=${limit}&start=${start}&expand=${expandAttributes.join(
    ',',
  )}`;
  return fetchPages(`${path}?${params}`);
};

const fetchRootPages = async (
  spaceKey: string,
  start: number,
  limit: number,
): Promise<ChildPagesResponse> => {
  const path = `/wiki/rest/api/space/${spaceKey}/content`;
  const params = `limit=${limit}&start=${start}&expand=${expandAttributes.join(
    ',',
  )}&depth=root`;
  const pages = await fetchPages<SpaceContentResponse>(`${path}?${params}`);
  return constructChildPagesResponseFromSpaceContentResponse(pages);
};

const recursivelyFetchPages = <T extends PaginatedResults, R>(
  limit: number,
  fetchFunction: (start: number, limit: number) => Promise<T>,
  resultTransformations: (response: T) => R[],
): Promise<R[]> =>
  recursiveFetch<T, R>({
    currentFetch: fetchFunction(0, limit),
    terminatingFn: ({ size }) => {
      return size < limit;
    },
    getNextFetch: ({ start }) => fetchFunction(start + limit, limit),
    getResults: resultTransformations,
  });

const getChildrenForSpace = async (
  spaceKey: string | null,
  limit: number,
): Promise<false | PageData[]> =>
  spaceKey !== null &&
  (await recursivelyFetchPages(
    limit,
    (start, limit) => fetchRootPages(spaceKey, start, limit),
    injectLinksBaseToChildPagesResponse,
  ));

const getChildrenForPage = async (
  contentId: string | null,
  limit: number,
): Promise<false | PageData[]> =>
  contentId !== null &&
  (await recursivelyFetchPages(
    limit,
    (start, limit) => fetchChildPages(contentId, start, limit),
    injectLinksBaseToChildPagesResponse,
  ));

export const getDrafts = async (
  spaceKey: string | null,
  contentId: string | null,
): Promise<PageDataWithAncestors[]> => {
  const limit = 200;

  // either fetch child pages of a given page, or fetch all root pages of the space
  const childPages =
    (await getChildrenForTypeWithDrafts(ANCESTOR, contentId, limit)) ||
    (await getChildrenForTypeWithDrafts(SPACE, spaceKey, limit)) ||
    [];

  if (childPages.length === 0) {
    return [];
  }
  return childPages;
};

export const getChildren = async (
  spaceKey: string | null,
  contentId: string | null,
): Promise<PageData[]> => {
  const limit = 200;

  // either fetch child pages of a given page, or fetch all root pages of the space
  const childPages =
    (await getChildrenForPage(contentId, limit)) ||
    (await getChildrenForSpace(spaceKey, limit)) ||
    [];

  if (childPages.length === 0) {
    return [];
  }

  return childPages.filter((childPage) => childPage.status === 'current');
};

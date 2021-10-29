/**
 * This function would be used by Embedding product to create Confluence Content. Content created by this function will be tagged with "embedded" flag.
 * At the moment we only support creating a blank page and does not support cross domain request (Parent Product must be in same domain as Confluence)
 * To enable unlicensed user to create a page, parentProduct & parentProductContentContainerId are required.
 */

type props = {
  spaceKey: string;
  domain?: string; // POSTMVP: E.g., Confluence your-domain.atlassian.net. Only needed when calling from third party app that does not have same domain.
  parentPageId?: string;
  parentProduct?: string;
  parentProductContentContainerId?: string;
};

type createContentResult = {
  draftShareId: string | undefined;
  spaceKey: string | undefined;
  contentId: string | undefined;
};

export type ContentMetadata = {
  id: string;
  space?: {
    id: string | number;
    key: string;
  };
  _links: {
    context: string;
    editui: string;
  };
};

export type UnlicensedAccessHeaderFields = Pick<
  props,
  'parentProduct' | 'parentProductContentContainerId' | 'spaceKey'
>;

const REQUIRED_UNLICENSED_ACCESS_HEADER_KEYS: (keyof UnlicensedAccessHeaderFields)[] = [
  'parentProduct',
  'parentProductContentContainerId',
  'spaceKey',
];

export const HEADER_KEY = 'X-Atl-EmbeddablePage-EntityIDs';

// TODO: Post MVP: Figure out how to allow cross domain call and how to get/set auth token. Probably need to have BE changes to set correct CORS headers and support pre-flight OPTIONS request.
export const createContent = async ({
  spaceKey,
  parentPageId,
  parentProduct,
  parentProductContentContainerId,
  domain = '',
}: props): Promise<createContentResult> => {
  const payload: any = {
    type: 'page',
    status: 'draft',
    metadata: {
      properties: {
        editor: {
          value: 'v2',
        },
      },
      frontend: {
        embedded: true,
      },
    },
    space: {
      key: spaceKey,
    },
  };

  if (parentPageId) {
    payload.ancestors = [{ id: parentPageId }];
  }

  const baseurl = domain ? `https://${domain}` : domain;
  const unlicensedAccessHeader = getUnlicensedAccessHeader({
    parentProduct,
    parentProductContentContainerId,
    spaceKey,
  });

  let response;

  try {
    response = await fetch(`${baseurl}/wiki/rest/api/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        ...unlicensedAccessHeader,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // Promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side else resolve
    throw new Error(`Network failure ${e}`);
  }

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status: ${responseJson.statusCode} Message: ${responseJson.message}`,
    );
  }

  return {
    draftShareId: getDraftShareId(responseJson),
    spaceKey: responseJson?.space?.key,
    contentId: responseJson?.id,
  };
};

const getDraftShareId = (data: ContentMetadata): string | undefined =>
  (data?._links?.editui || '').match(/draftShareId=(.*?)(#|&|$)/)?.[1] ||
  undefined;

const getUnlicensedAccessHeader = ({
  parentProduct,
  parentProductContentContainerId,
  spaceKey,
}: UnlicensedAccessHeaderFields): { [HEADER_KEY]: string } | undefined => {
  const headerValue = {
    parentProduct,
    parentProductContentContainerId,
    spaceKey,
  };

  const isValidHeader = REQUIRED_UNLICENSED_ACCESS_HEADER_KEYS.every((key) =>
    Boolean(headerValue[key]),
  );

  return isValidHeader
    ? { [HEADER_KEY]: JSON.stringify(headerValue) }
    : undefined;
};

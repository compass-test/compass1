// eslint-disable-next-line import/no-extraneous-dependencies
import { FetchMock } from 'jest-fetch-mock';

import {
  HEADER_KEY,
  createContent,
  UnlicensedAccessHeaderFields,
} from '../createContent';
import type { ContentMetadata } from '../createContent';

interface ExtendedGlobal extends NodeJS.Global {
  fetch: FetchMock;
}

const extendedGlobal: ExtendedGlobal = global;
const api = '/wiki/rest/api/content';

const defaultBodyPayload = {
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
    key: 'space-key',
  },
};

const defaultAPIResponse: ContentMetadata = {
  id: 'content-id',
  space: {
    id: 'space-id',
    key: 'space-key',
  },
  _links: {
    context: '/wiki',
    editui: 'test-url.com?draftShareId=draft-share-id',
  },
};

const expectedResult = {
  draftShareId: 'draft-share-id',
  spaceKey: 'space-key',
  contentId: 'content-id',
};

const getExpectedFetchRequest = (body = {}, headers = {}) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      ...headers,
    },
    body: JSON.stringify({ ...defaultBodyPayload, ...body }),
  };
};

const mockResponse = (res = {}, init = {}) => {
  extendedGlobal.fetch.once(JSON.stringify({ ...defaultAPIResponse, ...res }), {
    status: 200,
    ...init,
  });
};

afterEach(() => {
  extendedGlobal.fetch.resetMocks();
});

it('should return draftShareId, spaceKey, contentId', async () => {
  mockResponse();
  const response = await createContent({
    spaceKey: 'space-key',
  });
  expect(extendedGlobal.fetch).toHaveBeenCalledWith(
    api,
    getExpectedFetchRequest(),
  );
  expect(response).toEqual(expectedResult);
});

it('should return draftShareId, spaceKey, contentId when parentPageId is given', async () => {
  mockResponse();
  const response = await createContent({
    spaceKey: 'space-key',
    parentPageId: 'parent-page-id',
  });
  expect(extendedGlobal.fetch).toHaveBeenCalledWith(
    api,
    getExpectedFetchRequest({ ancestors: [{ id: 'parent-page-id' }] }),
  );
  expect(response).toEqual(expectedResult);
});

it('should call API using correct domain when domain is given', async () => {
  mockResponse();
  const response = await createContent({
    spaceKey: 'space-key',
    domain: 'test.com',
  });
  expect(extendedGlobal.fetch).toHaveBeenCalledWith(
    `https://test.com${api}`,
    getExpectedFetchRequest(),
  );
  expect(response).toEqual(expectedResult);
});

it('should return correct draftShareId when editUI has # at the end', async () => {
  mockResponse({
    _links: {
      context: '/wiki',
      editui: 'test-url.com?draftShareId=draft-share-id#',
    },
  });
  const response = await createContent({
    spaceKey: 'space-key',
  });
  expect(response).toEqual(expectedResult);
});

it('should return correct draftShareId when editUI has & at the end', async () => {
  mockResponse({
    _links: {
      context: '/wiki',
      editui: 'test-url.com?draftShareId=draft-share-id&',
    },
  });
  const response = await createContent({
    spaceKey: 'space-key',
  });
  expect(response).toEqual(expectedResult);
});

it('should return correct draftShareId when editUI is empty', async () => {
  mockResponse({
    _links: {
      context: '/wiki',
      editui: '',
    },
  });
  const response = await createContent({
    spaceKey: 'space-key',
  });
  expect(response).toEqual({ ...expectedResult, draftShareId: undefined });
});

it('should throw Network failure error when fetch rejects', async () => {
  extendedGlobal.fetch.mockRejectOnce(new Error('Failed'));
  try {
    await createContent({ spaceKey: 'space-key' });
  } catch (e) {
    expect(e.message).toEqual('Network failure Error: Failed');
  }
});

it('should throw Error when fetch returns !response.ok', async () => {
  mockResponse(
    {},
    {
      status: 403,
    },
  );
  try {
    await createContent({ spaceKey: 'space-key' });
  } catch (e) {
    // Undefined because jest-fetch-mock does not return statusCode & message as expected
    expect(e.message).toEqual('Status: undefined Message: undefined');
  }
});

it('should add unlicensed access header when all required parameters are provided', async () => {
  mockResponse();
  await createContent({
    spaceKey: 'space-key',
    parentProductContentContainerId: 'content-container-id',
    parentProduct: 'parent-product',
  });
  expect(extendedGlobal.fetch).toHaveBeenCalledWith(
    api,
    getExpectedFetchRequest(undefined, {
      [HEADER_KEY]:
        '{"parentProduct":"parent-product","parentProductContentContainerId":"content-container-id","spaceKey":"space-key"}',
    }),
  );
});

['parentProduct', 'parentProductContentContainerId'].forEach((key) => {
  it(`should not add unlicensed access header if ${key} is missing`, async () => {
    mockResponse();
    const params: UnlicensedAccessHeaderFields = {
      spaceKey: 'space-key',
      parentProduct: 'parent-product',
      parentProductContentContainerId: 'content-container-id',
    };
    delete (params as any)[key];
    await createContent(params);
    expect(extendedGlobal.fetch).toHaveBeenCalledWith(
      api,
      getExpectedFetchRequest(),
    );
  });
});

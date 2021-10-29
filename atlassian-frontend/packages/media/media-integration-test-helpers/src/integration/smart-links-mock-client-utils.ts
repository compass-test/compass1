import Client from '@atlaskit/smart-card/client';
import { ResolveResponse } from '@atlaskit/smart-card/types';
import { smallImage } from '@atlaskit/media-test-helpers/images';
// eslint-disable-next-line import/no-extraneous-dependencies
import { JsonLd, defaults } from 'json-ld-types';
import { AccessTypes } from '@atlaskit/media-ui';
import { APIError } from '@atlaskit/smart-card';

export interface SmartLinkTestWindow extends Window {
  SMART_LINKS_REQUESTED: string[];
}

declare let window: SmartLinkTestWindow;

const inlineCardTestUrl = 'https://inlineCardTestUrl';
const inlineCardTestUrlUnauthorized = 'https://inlineCardTestUrl/unauthorized';
const inlineCardTestUrlNotFound = 'https://inlineCardTestUrl/notFound';
const inlineCardTestUrlForbidden = 'https://inlineCardTestUrl/forbidden';
const inlineCardTestUrlErrored = 'https://inlineCardTestUrl/errored';
const blockCardTestUrl = 'https://blockCardTestUrl';
const blockCardTestUrlUnauthorized = 'https://blockCardTestUrl/unauthorized';
const blockCardTestUrlNotFound = 'https://blockCardTestUrl/notFound';
const blockCardTestUrlForbidden = 'https://blockCardTestUrl/forbidden';
const blockCardTestUrlErrored = 'https://blockCardTestUrl/errored';
const blockCardTestUrlLongTitle = 'https://blockCardLongTestUrl';
const blockCardTestUrlSupportedPlatforms =
  'https://blockCardTestUrlSupportedPlatforms';
const embedCardTestUrl = 'https://embedCardTestUrl';
const embedCardTestUrlNoMessages = 'https://embedCardTestUrl/noMessages';
const embedCardTestUrlFallback = 'https://embedCardTestUrl/fallback';
const embedCardTestUrlUnauthorized = 'https://embedCardTestUrl/unauthorized';
const embedCardTestUrlNotFound = 'https://embedCardTestUrl/notFound';
const embedCardTestUrlForbidden = 'https://embedCardTestUrl/forbidden';
const embedCardTestUrlErrored = 'https://embedCardTestUrl/errored';

export const MOCK_AUTH_PROVIDER_URL = 'https://www.google.com';

export interface cardPayloadArguments {
  url: string;
  metaType?: keyof typeof defaults.meta;
  requestAccess?: {
    accessType: AccessTypes;
  };
  embedIframeArgument?: string;
  name?: string;
  supportedPlatforms?: JsonLd.Primitives.Platforms[];
}

export const cardPayload = ({
  url,
  metaType,
  requestAccess,
  embedIframeArgument,
  name = 'birdman.jpg',
  supportedPlatforms,
}: cardPayloadArguments): JsonLd.Object<
  JsonLd.Meta.BaseMeta,
  JsonLd.Data.Document
> => ({
  meta: {
    ...(metaType ? defaults.meta[metaType] : defaults.meta.granted),
    // NOTE: a mock auth provider is setup below, pointing to a dud URL.
    // Do not expect the starting and finishing of authorization or forbidden
    // flows to work as expected in tests!
    auth: [
      {
        key: 'auth-provider',
        displayName: 'Auth Provider',
        url: MOCK_AUTH_PROVIDER_URL,
      },
    ],
    // set auth flow to empty, request access is first party (Atlassian specific) metadata for determining auth flow
    ...(requestAccess && { requestAccess, auth: [] }),
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    '@id': 'id:gbp5oQsUU5AAAAAAAAAACg',
    '@type': 'Document',
    'schema:fileFormat': 'image/jpeg',
    'schema:potentialAction': {
      '@type': 'DownloadAction',
      name: 'Download',
      identifier: 'dropbox-object-provider',
    },
    'atlassian:downloadUrl':
      'https://www.dropbox.com/s/q3njsd094anqero/birdman.jpg?dl=1',
    'atlassian:fileSize': 727238,
    'atlassian:isDeleted': false,
    attributedTo: {
      '@type': 'Person',
      name: 'Artur Bodera',
    },
    context: {
      '@type': 'Collection',
      name: 'Root',
    },
    generator: {
      '@type': 'Application',
      icon: {
        '@type': 'Image',
        url: smallImage,
      },
      name: 'Dropbox',
    },
    preview: {
      '@type': 'Link',
      'atlassian:supportedPlatforms': supportedPlatforms,
      href:
        // This is a direct link to special example that serve purpose of embed iframe content
        // packages/editor/editor-core/examples/88-media-embed-html-source.tsx
        // packages/editor/renderer/examples/88-media-embed-html-source.tsx
        getMediaEmbedSourceExampleUrl(embedIframeArgument),
    },
    summary: 'Smart Links are alive, right here!',
    name,
    url,
  },
});

/**
 * This generates a direct link to another example that will be used as a source in iframe.
 * Depending on where we are (in editor or renderer) we will generate different url. We use
 * the fact, that runtime we are in a example itself, so it should have all the `groupId` and `packageId`
 * query parameters that we use to generate url to a different example in the same package.
 */
const getMediaEmbedSourceExampleUrl = (extraQueryParam?: string) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.set('exampleId', 'media-embed-html-source');
  if (extraQueryParam) {
    params.append(extraQueryParam, 'true');
  }

  return url.toString();
};

const cardConfluencePayload = (
  url: string,
): JsonLd.Object<JsonLd.Meta.BaseMeta, JsonLd.Data.Document> => ({
  meta: defaults.meta.granted,
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Confluence',
      name: 'Confluence',
    },
    '@type': ['Document', 'schema:TextDigitalDocument'],
    url,
    name: url,
    'atlassian:state': 'current',
    summary: 'This page is within the Teamwork Platform space',
    'schema:commentCount': 4,
  },
});

let embedCardFallbackPayload = cardPayload({ url: embedCardTestUrlFallback });
embedCardFallbackPayload = {
  ...embedCardFallbackPayload,
  data: { ...embedCardFallbackPayload.data, preview: undefined },
} as JsonLd.Object<JsonLd.Meta.BaseMeta, JsonLd.Data.Document>;

const erroredPayload = {
  data: null,
} as any;

const generateRequestAccessCardPayloads = (): {
  [key: string]: JsonLd.Response;
} => {
  const forbiddenUrls = [
    inlineCardTestUrlForbidden,
    blockCardTestUrlForbidden,
    embedCardTestUrlForbidden,
  ];
  const RequestAccessTypes: AccessTypes[] = [
    'REQUEST_ACCESS',
    'PENDING_REQUEST_EXISTS',
    'FORBIDDEN',
    'DIRECT_ACCESS',
    'DENIED_REQUEST_EXISTS',
    'APPROVED_REQUEST_EXISTS',
    'ACCESS_EXISTS',
  ];
  let result: { [key: string]: JsonLd.Response } = {};
  for (let url of forbiddenUrls) {
    for (let type of RequestAccessTypes) {
      let newUrl = `${url}/${type}`;
      let newPayload = cardPayload({
        url: newUrl,
        requestAccess: { accessType: type },
        metaType: 'permissionDenied',
      });
      result = { ...result, [newUrl]: newPayload };
    }
  }
  return result;
};

export const noHeightMessagesQueryParameter = 'no-messages';
const payloadMap: { [key: string]: JsonLd.Response } = {
  [inlineCardTestUrl]: cardPayload({ url: inlineCardTestUrl }),
  [inlineCardTestUrlUnauthorized]: cardPayload({
    url: inlineCardTestUrlUnauthorized,
    metaType: 'unauthorized',
  }),
  [inlineCardTestUrlForbidden]: cardPayload({
    url: inlineCardTestUrlForbidden,
    metaType: 'permissionDenied',
  }),
  [inlineCardTestUrlNotFound]: cardPayload({
    url: inlineCardTestUrlNotFound,
    metaType: 'notFound',
  }),
  [blockCardTestUrlUnauthorized]: cardPayload({
    url: blockCardTestUrlUnauthorized,
    metaType: 'unauthorized',
  }),
  [blockCardTestUrlForbidden]: cardPayload({
    url: blockCardTestUrlForbidden,
    metaType: 'permissionDenied',
  }),
  [blockCardTestUrlNotFound]: cardPayload({
    url: blockCardTestUrlNotFound,
    metaType: 'notFound',
  }),
  [blockCardTestUrl]: cardPayload({ url: blockCardTestUrl }),
  [blockCardTestUrlLongTitle]: cardPayload({
    url: blockCardTestUrlLongTitle,
    name:
      'My super duper long title which will surely overflow to the next line.jpg',
  }),
  [blockCardTestUrlSupportedPlatforms]: cardPayload({
    url: blockCardTestUrlSupportedPlatforms,
    supportedPlatforms: ['web'],
  }),
  [inlineCardTestUrlErrored]: erroredPayload,
  [blockCardTestUrlErrored]: erroredPayload,
  [embedCardTestUrl]: cardPayload({ url: embedCardTestUrl }),
  [embedCardTestUrlNoMessages]: cardPayload({
    url: embedCardTestUrl,
    metaType: undefined,
    embedIframeArgument: noHeightMessagesQueryParameter,
  }),
  [embedCardTestUrlFallback]: embedCardFallbackPayload,
  [embedCardTestUrlErrored]: erroredPayload,
  [embedCardTestUrlUnauthorized]: cardPayload({
    url: embedCardTestUrl,
    metaType: 'unauthorized',
  }),
  [embedCardTestUrlForbidden]: cardPayload({
    url: embedCardTestUrl,
    metaType: 'permissionDenied',
  }),
  [embedCardTestUrlNotFound]: cardPayload({
    url: embedCardTestUrl,
    metaType: 'notFound',
  }),
  ...generateRequestAccessCardPayloads(),
};

export const getData = (url: string) => {
  if (url.includes('product-fabric.atlassian.net')) {
    return cardConfluencePayload(url);
  }
  if (url.includes('/resolving')) {
    return;
  }

  const key = getPayloadKey(url);
  const response = key ? payloadMap[key] : undefined;

  // Keep track of the network requests which have been made.
  if (!window.SMART_LINKS_REQUESTED) {
    window.SMART_LINKS_REQUESTED = [];
  }
  window.SMART_LINKS_REQUESTED = window.SMART_LINKS_REQUESTED.concat(url);

  // We only support known URLs which match with those registered at the top of this file.
  if (!response) {
    const errorMessage = `${url} is not known for mock smart-card provider.
    Please see packages/media/media-integration-test-helpers/src/integration/smart-links-mock-client-utils.ts for available options.`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response;
};

const getPayloadKey = (url: string) => {
  const hostname = new URL(url).hostname;
  const mockUrls = Object.keys(payloadMap);
  // Here, we check which mock URL the incoming URL matches up with (starts with that URL).
  // Since we have generic URLs for the resolved state (e.g. https://inlineCardTestUrl),
  // we do a small check here to see if the incoming URL has extra parts. If it does, we
  // find the corresponding key, otherwise we simply lookup the resolved mapping. This
  // enables mocks for different URLs:
  // E.g.
  // - https://inlineCardTestUrl                -> resolved state
  // - https://inlineCardTestUrl/1              -> resolved state
  // - https://inlineCardTestUrl/2              -> resolved state
  // - https://inlineCardTestUrl/3              -> resolved state
  // - https://inlineCardTestUrl/unauthorized/1 -> unauthorized state
  // - https://inlineCardTestUrl/unauthorized/2 -> unauthorized state
  const isExactMatch = url.toLowerCase() === `https://${hostname}`;
  if (isExactMatch) {
    return url;
  } else {
    const keys = mockUrls.filter((mockUrl) => url.startsWith(mockUrl));
    // Return the key with the best match (longest length).
    return keys.reduce(
      (keyOfMaxLength, key) =>
        key.length > keyOfMaxLength.length ? key : keyOfMaxLength,
      '',
    );
  }
};

export class MockedSmartCardClient extends Client {
  mockRequest(url: string): Promise<ResolveResponse> {
    const isResolving = url.includes('/resolving');
    const timeout = isResolving ? 1000000000 : 500;
    const data = getData(url)!;
    return new Promise((resolve, reject) => {
      // We simulate a 0.5s load time
      window.setTimeout(() => {
        if (url.endsWith('fatal')) {
          reject(new APIError('fatal', 'randomhost', 'It all went wrong'));
        }
        if (url.includes('errored')) {
          reject(new Error('Ohhhh boy'));
        } else {
          resolve(data);
        }
      }, timeout);
    });
  }

  fetchData(url: string): Promise<ResolveResponse> {
    return this.mockRequest(url);
  }

  async prefetchData(url: string): Promise<ResolveResponse | undefined> {
    return this.mockRequest(url);
  }
}

export const cardClient = new MockedSmartCardClient('staging');

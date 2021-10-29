import { Client, ResolveResponse } from '@atlaskit/smart-card';

/**
 * A mock smart link client implementation that returns the provided link
 * with a confluence page icon.
 */
export class MockSmartLinkClient extends Client {
  fetchData(url: string) {
    return Promise.resolve({
      meta: {
        visibility: 'public',
        access: 'granted',
        auth: [],
        definitionId: 'def1',
      },
      data: {
        '@type': 'schema:TextDigitalDocument',
        generator: {
          '@type': 'Application',
          '@id': 'https://www.atlassian.com/#Confluence',
          name: 'Confluence',
        },
        '@context': {
          '@vocab': 'https://www.w3.org/ns/activitystreams#',
          atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
          schema: 'http://schema.org/',
        },
        url,
        name: `Link to: ${url}`,
      },
    } as ResolveResponse);
  }
}

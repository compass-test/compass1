import { Client, ResolveResponse } from '@atlaskit/smart-card';
import { CONFLUENCE_URL_MATCH } from './confluence-url-match';

/**
 * A Client is responsible for resolving URLs to JSON-LD with metadata
 */
export class ConfluenceCardClient extends Client {
  fetchData(url: string): Promise<ResolveResponse> {
    if (!url.match(CONFLUENCE_URL_MATCH)) {
      // This doesn't look like Confluence URL, so let's use native resolver
      return super.fetchData(url);
    }

    // In this example, we will use mock response, but in real implementation
    // we would probably use window.fetch() to resolve the url and then map
    // it to JSON-LD format. To read more about the format, please visit:
    //   https://product-fabric.atlassian.net/wiki/spaces/CS/pages/609257121/Document
    //
    return new Promise((resolve) => {
      // We simulate a 2s load time
      window.setTimeout(() => {
        resolve({
          meta: {
            visibility: 'restricted',
            access: 'granted',
            auth: [],
            definitionId: 'confluence-native-resolve',
          },
          data: {
            '@context': {
              '@vocab': 'https://www.w3.org/ns/activitystreams#',
              atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
              schema: 'http://schema.org/',
            },
            '@type': ['schema:DigitalDocument', 'Document'],
            name: decodeURIComponent(
              url.match(/.+\/(.*?)(?:\?|$)/)![1],
            ).replace(/\+/g, ' '),
            url,
          },
        });
      }, 2000);
    });
  }
}

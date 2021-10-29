import { EditorCardProvider } from '@atlaskit/smart-card';

type CardAppearance = 'inline' | 'block';

export class EditorTestCardProvider extends EditorCardProvider {
  testUrlMatch = new RegExp('^https?://([a-z_-]*.)?atlassian.com');

  // Matches all confluence pages and is used to simulate links which
  // are supported by Smartlinks from CMD + K menu
  testNativeUrlMatch = new RegExp(
    '^https?://product-fabric.atlassian.net/wiki/.*$',
  );

  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    if (url.match(this.testUrlMatch)) {
      return {
        type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
        attrs: {
          data: {
            '@context': 'https://www.w3.org/ns/activitystreams',
            '@type': 'Document',
            name: 'Welcome to Atlassian!',
            url: 'http://www.atlassian.com',
          },
        },
      };
    } else if (url.match(this.testNativeUrlMatch)) {
      return {
        type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
        attrs: {
          data: {
            '@context': 'https://www.w3.org/ns/activitystreams',
            '@type': 'Document',
            name: url,
            url,
          },
        },
      };
    } else {
      return super.resolve(url, appearance);
    }
  }

  async findPattern(url: string) {
    // Needed to show blue link appearance switcher in VR
    if (url === 'https://inlineCardTestUrl') {
      return true;
    }

    return super.findPattern(url);
  }
}

export const cardProvider = new EditorTestCardProvider();
export const cardProviderStaging = new EditorTestCardProvider('staging');

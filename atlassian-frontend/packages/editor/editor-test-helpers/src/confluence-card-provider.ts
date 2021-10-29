import { CardAppearance, EditorCardProvider } from '@atlaskit/smart-card';
import { CONFLUENCE_URL_MATCH } from './confluence-url-match';

export class ConfluenceCardProvider extends EditorCardProvider {
  /**
   * This method must resolve to a valid ADF that will be used to
   * replace a blue link after user pastes URL.
   *
   * @param url The pasted URL
   * @param appearance Appearance requested by the Editor
   */
  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    // This example uses a regex .match() but we could use a backend call below
    if (url.match(CONFLUENCE_URL_MATCH)) {
      return {
        type: 'inlineCard', // we always want inline cards for Confluence cards
        attrs: {
          url,
        },
      };
    }

    // If the URL doesn't look like a confluence URL, try native provider.
    return super.resolve(url, appearance);
  }
}

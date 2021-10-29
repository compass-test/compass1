import {
  SearchProvider,
  QuickSearchResult,
} from '@atlaskit/editor-common/provider-factory';

export class MockSearchProvider implements SearchProvider {
  constructor(readonly items: QuickSearchResult[]) {}

  quickSearch(query: string): Promise<QuickSearchResult[]> {
    return Promise.resolve(this.items);
  }
}

export function searchProviderFactory(items: Array<QuickSearchResult>) {
  return Promise.resolve(new MockSearchProvider(items));
}

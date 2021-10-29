import { MentionProvider } from '@atlaskit/mention';
import { ProviderHandler } from '@atlassian/forge-ui-types';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

const defaultMockResults: User[] = [
  { id: '123', name: 'Nathan', avatarUrl: 'path/to/img' },
  { id: '456', name: 'Bob', avatarUrl: 'path/to/img' },
];

export class MockMentionProvider implements MentionProvider {
  constructor(private mockResults: User[] = defaultMockResults) {}

  public subscribe(_key: string, resultsCb?: (users: User[]) => void) {
    resultsCb!(this.mockResults);
  }

  public unsubscribe() {}

  public filter() {}

  recordMentionSelection() {
    throw new Error('Method not implemented.');
  }

  shouldHighlightMention(): boolean {
    throw new Error('Method not implemented.');
  }

  isFiltering(): boolean {
    throw new Error('Method not implemented.');
  }
}

export const mockMentionsProviderPromise = Promise.resolve(
  new MockMentionProvider(),
);

export class MockProviderFactory {
  provider?: MentionProvider;
  constructor(provider?: MentionProvider) {
    this.provider = provider;
  }

  public subscribe(_key: string, cb: ProviderHandler) {
    cb(
      'name',
      this.provider
        ? Promise.resolve(this.provider)
        : mockMentionsProviderPromise,
    );
  }
  public unsubscribe() {}
}

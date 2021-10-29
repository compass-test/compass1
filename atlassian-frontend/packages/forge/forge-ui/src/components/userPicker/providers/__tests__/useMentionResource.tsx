import { renderHook } from '@testing-library/react-hooks';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { MentionProvider } from '@atlaskit/mention';
import { useMentionResource } from '../useMentionResource';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const mockResult = [{ id: '123', name: 'Bob', avatarUrl: 'path/to/img' }];

// @ts-ignore mock relevant subset of MentionProvider
const mockMentionProvider = {
  subscribe: jest.fn((_, resultsCb) => resultsCb && resultsCb(mockResult)),
  unsubscribe: jest.fn(),
  filter: jest.fn(),
} as MentionProvider;

describe('useMentionResource', () => {
  const FILTER_QUERY = 'query';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns undefined if there is no provider in context', () => {
    const { result } = renderHook(() => useMentionResource());
    expect(result.current).toBe(undefined);
  });

  it('returns a function when passed a mentionsProvider', async () => {
    const { result } = renderHook(() =>
      useMentionResource(Promise.resolve(mockMentionProvider)),
    );

    expect(result.current).toBeInstanceOf(Function);
  });

  it('returns a Promise that resolves to the results of the provider', async () => {
    const { result } = renderHook(() =>
      useMentionResource(Promise.resolve(mockMentionProvider)),
    );

    await expect(result.current!(FILTER_QUERY)).resolves.toEqual(mockResult);
  });

  it('calls the unsubscribe method on the provider after receiving results', async () => {
    const { result } = renderHook(() =>
      useMentionResource(Promise.resolve(mockMentionProvider)),
    );

    await result.current!(FILTER_QUERY);

    expect(mockMentionProvider.unsubscribe).toBeCalled();
  });
});

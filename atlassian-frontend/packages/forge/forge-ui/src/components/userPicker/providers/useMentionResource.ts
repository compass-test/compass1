import { useCallback } from 'react';
import { MentionDescription, MentionProvider } from '@atlaskit/mention';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
type Query = (query?: string) => Promise<User[]>;

// Key for registering and unregistering the subscriber
const MENTION_SUBSCRIBER_KEY = 'forge-ui-user-select';

const mentionResultsToUsers = (results: MentionDescription[]): User[] => {
  return results
    .map((result) => ({
      id: result.id,
      name: result.name,
      avatarUrl: result.avatarUrl || '',
    }))
    .filter<User>((user): user is User => typeof user.name !== 'undefined');
};

/**
 * A hook to query a mention resource that is provided from
 * a ProvidersFactory from Confluence
 */
export const useMentionResource = (
  mentionProvider?: Promise<MentionProvider>,
): Query | undefined => {
  const query = useCallback(
    async (search?: string): Promise<User[]> => {
      const provider = await mentionProvider;
      if (provider && search) {
        return new Promise<User[]>((resolve) => {
          provider.filter(search);

          provider.subscribe(
            MENTION_SUBSCRIBER_KEY,
            (results: MentionDescription[]) => {
              provider.unsubscribe(MENTION_SUBSCRIBER_KEY);
              resolve(mentionResultsToUsers(results));
            },
            () => {
              provider.unsubscribe(MENTION_SUBSCRIBER_KEY);
              resolve([]);
            },
          );
        });
      }
      return Promise.resolve([]);
    },
    [mentionProvider],
  );

  if (mentionProvider) {
    return query;
  }
};

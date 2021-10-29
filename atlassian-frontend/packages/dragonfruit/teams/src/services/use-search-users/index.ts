import { useCallback, useState } from 'react';

import { User, UserType } from '@atlaskit/user-picker';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

const PRODUCT_KEY = 'compass';

interface Config {
  getRecommendationServiceUrl(baseUrl: string): string;
  getUsersServiceUrl(productKey: string): string;
}

const PRD_CONFIG: Config = {
  getRecommendationServiceUrl(baseUrl: string) {
    return baseUrl
      ? `/${baseUrl}/gateway/api/v1/recommendations`
      : '/gateway/api/v1/recommendations';
  },
  getUsersServiceUrl(productKey: string) {
    return productKey === PRODUCT_KEY
      ? `/rest/api/3/user/bulk`
      : `/wiki/rest/api/user/bulk`;
  },
};

enum EntityType {
  USER = 'USER',
}

interface ServerResponse {
  recommendedUsers: ServerItem[];
}

interface ServerItem {
  id: string;
  description?: string;
  teamAri?: string;
  displayName?: string;
  name: string;
  entityType: EntityType.USER;
  avatarUrl: string;
  email?: string;
  attributes?: Record<string, string>;
}

interface ServerUser extends ServerItem {
  name: string;
  entityType: EntityType.USER;
  avatarUrl: string;
  email?: string;
  attributes?: Record<string, string>;
}

interface RecommendationRequest {
  baseUrl?: string;
  context: Context;
  maxNumberOfResults: number;
  query?: string;
  includeUsers?: boolean;
}

const transformUser = (item: ServerItem): User => {
  const user = item as ServerUser;

  return {
    id: user.id,
    type: UserType,
    avatarUrl: user.avatarUrl,
    name: user.name,
    email: user.email,
  };
};

const transformUsers = (serverResponse: ServerResponse): User[] =>
  (serverResponse.recommendedUsers || []).map((user) => transformUser(user));

const getConfig = () => PRD_CONFIG;

export enum UserSearchContextType {
  MENTIONS = 'Mentions',
  ASSIGNEE = 'Assignee',
  GENERIC = 'Generic',
  BYO = '<BYO>',
}

interface Context {
  containerId?: string;
  contextType: string;
  objectId?: string;
  sessionId?: string;
  principalId?: string;
  childObjectId?: string;
  productKey: string;
  siteId: string;
}

interface Props {
  query: string;
  contextType?: UserSearchContextType;
  maxNumberOfResults?: number;
  onCompleted?: (data: User[]) => void;
}

export const useSearchUsers = (
  props: Props,
): {
  loading: boolean;
  users: User[];
  error: any;
  fetchData: () => Promise<void>;
} => {
  const {
    query,
    contextType = UserSearchContextType.GENERIC,
    maxNumberOfResults = 3,
    onCompleted,
  } = props;
  const { accountId, cloudId } = useTenantInfo();
  const request = {
    context: {
      principalId: accountId || 'context',
      contextType: contextType || UserSearchContextType.GENERIC,
      siteId: cloudId,
      productKey: PRODUCT_KEY,
    },
    maxNumberOfResults: maxNumberOfResults || 3,
    query,
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<any>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setUsers([]);

    try {
      const users = await getUserRecommendations(request);
      if (onCompleted) {
        onCompleted(users);
      }
      setUsers(users);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(props)]);

  return { loading, users, error, fetchData };
};

const getUserRecommendations = async (
  request: RecommendationRequest,
): Promise<User[]> => {
  const { baseUrl, context, includeUsers, maxNumberOfResults, query } = request;
  const url = getConfig().getRecommendationServiceUrl(baseUrl || '');

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      context,
      includeUsers,
      maxNumberOfResults,
      performSearchQueryOnly: true,
      searchQuery: {
        productAccessPermissionIds: ['write'],
        queryString: query,
        searchUserbase: false,
      },
    }),
  });

  const { status, statusText } = response;

  if (status !== 200) {
    throw new Error(
      `error calling smart service, statusCode=${status}, statusText=${statusText}`,
    );
  }

  const usersJson = await response.json();

  return transformUsers(usersJson);
};

import { useState, useEffect } from 'react';
import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import { timed } from '../../common/clients';

import { SimpleCache } from '../../utils/simple-cache';
import { UserDetails } from '../../common/user-context';
import { useJiraSearchClientContext } from '../clients/jira-search-provider';

interface AvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

interface ApplicationRoles {
  size: number;
  items: Array<{ key: string; name: string }>;
}

export interface UserResponse {
  displayName: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  accountId: string;
  applicationRoles: ApplicationRoles;
}

interface CurrentUserConfig {
  accountId: string;
  baseUrl: string;
  currentUserSupplier?: () => Promise<UserResponse>;
}

const USER_DATA_URL = '/rest/api/3/user';

export class JiraCurrentUserClient {
  private serviceConfig: ServiceConfig;

  private currentUserCache: SimpleCache<Promise<UserResponse>>;

  private accountId: string;

  constructor({ accountId, baseUrl, currentUserSupplier }: CurrentUserConfig) {
    this.serviceConfig = { url: baseUrl };
    this.accountId = accountId;
    this.currentUserCache = new SimpleCache(
      currentUserSupplier || this.getUserSupplier,
    );
  }

  public getCurrentUser = () => this.currentUserCache.get().value;

  private getUserSupplier: () => Promise<UserResponse> = async () => {
    const { result, durationMs } = await this.makeRequest<UserResponse>(
      USER_DATA_URL,
    );

    return { ...result, timings: durationMs };
  };

  private async makeRequest<T>(
    path: string,
  ): Promise<{ result: T; durationMs: number }> {
    const options: RequestServiceOptions = {
      path,
      queryParams: { accountId: this.accountId, expand: 'applicationRoles' },
    };

    return timed(utils.requestService<T>(this.serviceConfig, options));
  }
}

export const useJiraCurrentUser = (user: UserDetails = {}) => {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserDetails>(user);
  const { currentUserClient } = useJiraSearchClientContext();

  useEffect(() => {
    if (!loadingComplete) {
      let shouldUpdate = true;

      currentUserClient
        ?.getCurrentUser()
        .then((result) => {
          if (shouldUpdate && !loadingComplete) {
            setCurrentUser({
              id: result.accountId,
              name: result.displayName,
              avatarUrl: result.avatarUrls['24x24'],
              email: result.emailAddress,
              hasSoftwareAccess: result.applicationRoles.items.some(
                (item) => item.key === 'jira-software',
              ),
            });
            setLoadingComplete(true);
          }
        })
        .catch(() => {}); // swallow any errors

      return () => {
        shouldUpdate = false;
      };
    }
  }, [currentUserClient, loadingComplete]);

  return currentUser;
};

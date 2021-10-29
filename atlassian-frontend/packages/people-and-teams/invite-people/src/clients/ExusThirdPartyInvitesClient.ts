import { SlackWorkspace } from '../types';
import { ExternalUser } from '@atlaskit/user-picker';

import {
  DEFAULT_STARGATE_SERVICE_URL,
  EXUS_THIRDPARTY_PATH,
  INFI_URL,
} from './common';

interface IntegrationsResponse {
  enabledIntegrations: string[];
  connectedIntegrations: string[];
}
export interface ThirdPartyInvitesClientInterface {
  getExistingIntegrations(): Promise<IntegrationsResponse>;
  search(query: string): Promise<ExternalUser[]>;
  fetchSlackWorkspaces(
    cloudId: string,
    product: string,
  ): Promise<SlackWorkspace[]>;
  fetchSlackUsers(
    cloudId: string,
    product: string,
    teamId: string,
  ): Promise<ExternalUser[]>;
}

export class ExusThirdPartyInvitesClient
  implements ThirdPartyInvitesClientInterface {
  public async getExistingIntegrations(): Promise<IntegrationsResponse> {
    const resp = await fetch(this.exusThirdPartyUrl('integrations'));

    if (!resp.ok) {
      return Promise.reject(new Error('Unable to fetch existing integrations'));
    }

    return resp.json();
  }

  public async search(query: string): Promise<ExternalUser[]> {
    const resp = await fetch(this.exusThirdPartyUrl(`search?query=${query}`));

    if (!resp.ok) {
      return Promise.reject(new Error('Unable to fetch users query response'));
    }

    return (await resp.json()).map((d: any) => {
      return {
        id: d.email,
        email: d.email,
        name: d.displayName,
        publicName: d.displayName,
        avatarUrl: d.avatarUrl,
        type: 'user',
        isExternal: true,
        sources: d.sources.map((s: string) => s.toLowerCase()),
      } as ExternalUser;
    });
  }

  public async fetchSlackWorkspaces(
    cloudId: string,
    product: string,
  ): Promise<SlackWorkspace[]> {
    const path = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-workspaces?cloudId=${cloudId}&product=${product}`;
    const resp = await fetch(path);

    if (!resp.ok) {
      return Promise.reject(
        new Error('Unable to fetch slack workspaces query response'),
      );
    }
    const json = await resp.json();

    return json.teams;
  }

  public async fetchSlackUsers(
    cloudId: string,
    product: string,
    teamId: string,
  ): Promise<ExternalUser[]> {
    const path = `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/slack-conversations?cloudId=${cloudId}&teamId=${teamId}&product=${product}`;
    const resp = await fetch(path);

    if (!resp.ok) {
      return Promise.reject(
        new Error('Unable to fetch slack users query response'),
      );
    }
    const json = await resp.json();

    return json.dms.map((d: any) => {
      return {
        id: d.email,
        email: d.email,
        name: d.name,
        publicName: d.displayName,
        avatarUrl: d.avatarUrl,
        type: 'user',
        isExternal: true,
        sources: ['slack'],
      } as ExternalUser;
    });
  }

  private exusThirdPartyUrl(path: string) {
    return `${DEFAULT_STARGATE_SERVICE_URL}${EXUS_THIRDPARTY_PATH}/${path}`;
  }
}

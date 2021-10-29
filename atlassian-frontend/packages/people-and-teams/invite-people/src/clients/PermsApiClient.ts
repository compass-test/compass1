import { RequestServiceOptions, utils } from '@atlaskit/util-service-support';
import { DEFAULT_STARGATE_SERVICE_URL, PERMS_URL } from './common';
import {
  PermsApiRequest,
  PermsApiResponse,
  PermsApiResponseInterface,
  UserRole,
} from '../types';

export interface PermsApiClientInterface {
  getUserRole(cloudId: string): Promise<PermsApiResponseInterface>;
}

export class PermsApiClient implements PermsApiClientInterface {
  private isPermissionPermitted(
    request: PermsApiRequest,
  ): Promise<PermsApiResponse> {
    try {
      const { permissionId, cloudId } = request;
      const options: RequestServiceOptions = {
        path: PERMS_URL,
        requestInit: {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            permissionId,
            resourceId: `ari:cloud:platform::site/${cloudId}`,
          }),
        },
      };

      return utils.requestService(
        { url: DEFAULT_STARGATE_SERVICE_URL },
        options,
      );
    } catch (err) {
      err.message = `Error while checking permitted permission for resource: ${err.message}!`;
      throw err;
    }
  }

  public async getUserRole(
    cloudId: string,
  ): Promise<PermsApiResponseInterface> {
    try {
      const [
        { permitted: isInviteUsersPermitted },
        { permitted: isManagePermitted },
      ] = await Promise.all([
        this.isPermissionPermitted({ permissionId: 'invite-users', cloudId }),
        this.isPermissionPermitted({ permissionId: 'manage', cloudId }),
      ]);

      let role: UserRole;

      if (isInviteUsersPermitted && isManagePermitted) {
        role = 'admin';
      } else if (isInviteUsersPermitted && !isManagePermitted) {
        role = 'trusted';
      } else {
        role = 'basic';
      }

      return {
        role,
        isInviteUsersPermitted,
        isManagePermitted,
      };
    } catch (err) {
      //if something breaks while getting user role, fallback to 'basic'
      return {
        role: 'basic',
        errorMessage: `Error while getting user role: ${err.message}!`,
      };
    }
  }
}

export const defaultPermsApiClient = new PermsApiClient();

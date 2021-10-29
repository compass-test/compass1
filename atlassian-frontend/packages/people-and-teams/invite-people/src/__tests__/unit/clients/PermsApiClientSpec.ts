import { PermsApiRequest } from './../../../types';
import { utils } from '@atlaskit/util-service-support';
import {
  PermsApiClient,
  PermsApiClientInterface,
} from './../../../clients/PermsApiClient';
import { PermissionId } from '../../../types';

describe('PermsApiClient', () => {
  let requestSpy: jest.SpyInstance;
  let permsClient: PermsApiClientInterface;
  const mockCloudId = 'mock-cloud-id';

  const mockPermittedApi = (request: Record<PermissionId, boolean>) => {
    requestSpy.mockImplementation((_, { requestInit: { body } }) => {
      const jsonBody = JSON.parse(body) as PermsApiRequest;
      if (request[jsonBody.permissionId] !== undefined) {
        return { permitted: request[jsonBody.permissionId] };
      }
      return { permitted: true };
    });
  };

  beforeEach(() => {
    requestSpy = jest.spyOn(utils, 'requestService');
    requestSpy.mockResolvedValue({ permitted: true });
    permsClient = new PermsApiClient();
  });

  afterEach(() => requestSpy.mockRestore());

  describe('getUserRole', () => {
    it('should call isPermitted API two times', async () => {
      await permsClient.getUserRole(mockCloudId);
      expect(requestSpy).toBeCalledTimes(2);
    });

    it('should call isPermitted API with correct permissionIds', async () => {
      await permsClient.getUserRole(mockCloudId);
      const inviteUsersApiCallArgs = requestSpy.mock.calls[0];
      const manageApiCallArgs = requestSpy.mock.calls[1];

      expect(inviteUsersApiCallArgs[1].requestInit.body).toEqual(
        JSON.stringify({
          permissionId: 'invite-users',
          resourceId: `ari:cloud:platform::site/${mockCloudId}`,
        }),
      );
      expect(manageApiCallArgs[1].requestInit.body).toEqual(
        JSON.stringify({
          permissionId: 'manage',
          resourceId: `ari:cloud:platform::site/${mockCloudId}`,
        }),
      );
    });

    it('should call isPermitted API with correct request params', async () => {
      await permsClient.getUserRole(mockCloudId);
      const inviteUsersApiCallArgs = requestSpy.mock.calls[0];
      const manageApiCallArgs = requestSpy.mock.calls[1];

      expect(inviteUsersApiCallArgs[0].url).toEqual('/gateway/api');
      expect(inviteUsersApiCallArgs[1].path).toEqual('permissions/permitted');
      expect(inviteUsersApiCallArgs[1].requestInit.method).toEqual('post');

      expect(manageApiCallArgs[0].url).toEqual('/gateway/api');
      expect(manageApiCallArgs[1].path).toEqual('permissions/permitted');
      expect(manageApiCallArgs[1].requestInit.method).toEqual('post');
    });

    it('should return `basic` user role if the user does not have invite and manage permissions', async () => {
      requestSpy.mockResolvedValue({ permitted: false });
      const response = await permsClient.getUserRole(mockCloudId);
      expect(response).toEqual({
        role: 'basic',
        isManagePermitted: false,
        isInviteUsersPermitted: false,
      });
    });

    it('should return `admin` user role if the user have invite and manage permissions', async () => {
      requestSpy.mockResolvedValue({ permitted: true });
      const response = await permsClient.getUserRole(mockCloudId);
      expect(response).toEqual({
        role: 'admin',
        isManagePermitted: true,
        isInviteUsersPermitted: true,
      });
    });

    it('should return `trusted` user role if the user have invite but do not have manage permissions', async () => {
      mockPermittedApi({ 'invite-users': true, manage: false });
      const response = await permsClient.getUserRole(mockCloudId);
      expect(response).toEqual({
        role: 'trusted',
        isManagePermitted: false,
        isInviteUsersPermitted: true,
      });
    });

    it('should return `basic` user role if permission API fails', async () => {
      requestSpy
        .mockResolvedValueOnce({ permitted: true })
        .mockRejectedValueOnce(new Error('Something went wrong'));

      const response = await permsClient.getUserRole(mockCloudId);
      expect(response).toEqual({
        role: 'basic',
        errorMessage: `Error while getting user role: Something went wrong!`,
      });
    });
  });
});

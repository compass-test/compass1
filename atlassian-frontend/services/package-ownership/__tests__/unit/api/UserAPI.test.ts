import * as mocks from './UserAPI.test.mock';

import { UserAPI } from '../../../src/lib/api';
import { Logger } from '../../../src/lib/Logger';

describe('User Directory API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Fetches user on first go', async () => {
    mocks.mockAxiosInstance.get.mockResolvedValue({
      data: {
        aa_id: 'aaid',
      },
    });
    expect(await UserAPI.getAccountId('user')).toEqual('aaid');
  });

  test('Fetches user on second go', async () => {
    mocks.mockAxiosInstance.get
      .mockRejectedValueOnce({ status: 500 })
      .mockResolvedValueOnce({
        data: {
          aa_id: 'aaid',
        },
      });
    expect(await UserAPI.getAccountId('user')).toEqual('aaid');
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });

  test('Fails after two attempts', async () => {
    mocks.mockAxiosInstance.get.mockRejectedValue({ status: 500 });
    expect(await UserAPI.getAccountId('user')).toEqual(undefined);
    expect(Logger.error).toHaveBeenCalledTimes(2);
  });
});

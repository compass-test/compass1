import { isRealErrorFromService } from '../../errror';

describe('isRealErrorFromService', () => {
  it('should return true for a real error', async () => {
    const error = {
      status: 500,
      message: 'hello',
    };

    // @ts-ignore
    const result = isRealErrorFromService(error);
    expect(result).toBeTruthy();
  });

  it('should return false for 401 or 403 error', async () => {
    let error = {
      status: 401,
      message: 'hello',
    };

    // @ts-ignore
    let result = isRealErrorFromService(error);
    expect(result).toBeFalsy();

    error = {
      status: 403,
      message: 'hello',
    };

    // @ts-ignore
    result = isRealErrorFromService(error);
    expect(result).toBeFalsy();
  });
});

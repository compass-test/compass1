import { BitbucketApi } from './bitbucket';

describe('BitbucketApi.waitForCommit', () => {
  const retryTimeout = 5;
  let remoteSpy: jest.SpyInstance;
  let commitSpy: jest.SpyInstance;
  const mockCommit = (commit: string) => {
    return commitSpy.mockImplementationOnce(() => {
      return Promise.resolve({
        hash: commit,
        date: '',
        message: '',
        type: 'commit',
      });
    });
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    remoteSpy = jest.spyOn(BitbucketApi, 'waitForCommit');
    commitSpy = jest.spyOn(BitbucketApi, 'getCommit');
    // Default mock will return an error.
    // This is provided as a fallback to ensure we don't actually hit the remote
    // server, however individual tests as expected to override this mock with
    // their own "once" implementations using `mockCommit`.
    commitSpy.mockImplementation((commitHash: string) => {
      return Promise.resolve({
        hash: '',
        date: '',
        message: '',
        type: 'error',
        error: {
          message: 'nope',
          data: {
            shas: [commitHash],
          },
        },
      });
    });
  });

  afterEach(() => {
    remoteSpy.mockClear();
    commitSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return true when the expected commit is found upstream', async () => {
    mockCommit('abc123');
    const maxAttempts = 1;
    const exists = await BitbucketApi.waitForCommit(
      'abc123',
      maxAttempts,
      retryTimeout,
    );
    expect(exists).toBe(true);
    expect(remoteSpy).toHaveBeenCalledTimes(1);
  });

  it(`should retry if it doesn't find a match on the first attempt`, async () => {
    // Emulate the commit not existing yet
    mockCommit('abc456');
    // Emulate the commit existing on the second attempt
    mockCommit('xyz123');
    // Set maximum attemps higher than
    const maxAttempts = 3;
    const exists = await BitbucketApi.waitForCommit(
      'xyz123',
      maxAttempts,
      retryTimeout,
    );
    expect(exists).toBe(true);
    expect(remoteSpy).toHaveBeenCalledTimes(maxAttempts - 1);
  });

  it(`should return false if it doesn't find the expected commit after max attempts`, async () => {
    // Emulate the commit not existing
    mockCommit('c0ff33');
    mockCommit('c0ff33');
    mockCommit('c0ff33');
    const maxAttempts = 3;
    const exists = await BitbucketApi.waitForCommit(
      'abc123',
      maxAttempts,
      retryTimeout,
    );
    expect(exists).toBe(false);
    expect(remoteSpy).toHaveBeenCalledTimes(maxAttempts);
  });

  it('should trim whitespace from the input commit', async () => {
    mockCommit('abc123');
    const exists = await BitbucketApi.waitForCommit(
      '\n abc123 \n',
      1,
      retryTimeout,
    );
    expect(exists).toBe(true);
    expect(remoteSpy).toHaveBeenCalledTimes(1);
  });
});

jest.mock('@atlassian/micros-serverless-platform', () => {
  return {
    Secrets: {
      get: jest.fn(),
    },
  };
});

const { Secrets } = require('@atlassian/micros-serverless-platform');
const { getEnv } = require('../../');

describe('getEnv', () => {
  // clone and freeze process.env
  const OLD_ENV = process.env;
  beforeEach(() => {
    // clone process.env
    // reset process.env beforeEach test
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    // reset the process.env object
    process.env = OLD_ENV;
  });
  it('should not call the Secret service if the CONSTELLATION_NETLIFY_DEPLOY env is truthy', async () => {
    process.env.CONSTELLATION_NETLIFY_DEPLOY = true;
    const envGetter = getEnv('TEST_ENV');
    await envGetter();
    expect(Secrets.get).not.toBeCalled();
  });
  it('should not call the Secret service if the NETLIFY_DEV env is truthy', async () => {
    process.env.NETLIFY_DEV = true;
    process.env.TEST_ENV = 'GOBBLEDEEGOOK';
    const expected = process.env.TEST_ENV;
    const envGetter = getEnv('TEST_ENV');
    const result = await envGetter();
    expect(Secrets.get).not.toBeCalled();
    expect(result).toEqual(expected);
  });
  it('should call the Secret service if neither NETLIFY_DEV or CONSTELLATION_NETLIFY_DEPLOY env vars are truthy', async () => {
    const envGetter = getEnv('TEST_ENV');
    await envGetter();
    expect(Secrets.get).toBeCalled();
  });
});

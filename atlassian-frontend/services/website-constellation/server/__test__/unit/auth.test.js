const { serviceSingleton } = require('../../auth');

jest.mock('@atlassian/micros-serverless-platform', () => {
  return {
    Secrets: {
      get: jest.fn(),
    },
  };
});

// This change has been done due to the removal of IE11 from browserslist.
jest.mock('passport-google-oauth20', () => {
  class Strategy {}
  return {
    Strategy,
  };
});

jest.mock('passport-jwt', () => {
  class Strategy {}
  return {
    Strategy,
  };
});

jest.mock('passport', () => {
  return {
    use: () => {},
    serializeUser: () => {},
    deserializeUser: () => {},
    authenticate() {
      return () => {};
    },
  };
});

describe('serviceSingleton()', () => {
  it('should reference the same instance on successive calls of the returned function', async () => {
    const serviceCreator = await serviceSingleton();
    const result1 = await serviceCreator();
    const result2 = await serviceCreator();

    expect(result1).toEqual(result2);
  });
});

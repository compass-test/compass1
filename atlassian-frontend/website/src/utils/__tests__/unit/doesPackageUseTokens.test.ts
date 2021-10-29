import doesPackageUseTokens from '../../doesPackageUseTokens';
import { tokensPackageName } from '../../../constants';

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // Clear cache
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

describe('doesPackageUseTokens', () => {
  it('should add tokens if tokens package is in deps', () => {
    const pkgJSON = {
      dependencies: {
        [tokensPackageName]: '1.0.0',
      },
    };
    expect(doesPackageUseTokens(pkgJSON)).toEqual(true);
  });

  it('should add tokens if tokens package is in dev deps', () => {
    const pkgJSON = {
      devDependencies: {
        [tokensPackageName]: '1.0.0',
      },
    };
    expect(doesPackageUseTokens(pkgJSON)).toEqual(true);
  });

  it('should add tokens if tokens package is in peer deps', () => {
    const pkgJSON = {
      peerDependencies: {
        [tokensPackageName]: '1.0.0',
      },
    };
    expect(doesPackageUseTokens(pkgJSON)).toEqual(true);
  });

  it('should add tokens if ENABLE_TOKENS env variable set', () => {
    process.env.ENABLE_TOKENS = 'true';
    expect(doesPackageUseTokens({})).toEqual(true);
  });

  it('should not apply tokens if tokens are not imported in package.json and no env variable set', () => {
    expect(doesPackageUseTokens({})).toEqual(false);
  });
});

import { ENVIRONMENT, getEnvironment } from './constants';

describe('getEnvironment', () => {
  const initialNodeEnv = process.env.NODE_ENV;
  const initialMicrosEnv = process.env.MICROS_ENV;
  const initialCI = process.env.CI;
  afterEach(() => {
    process.env.NODE_ENV = initialNodeEnv;
    process.env.MICROS_ENV = initialMicrosEnv;
    process.env.CI = initialCI;
  });
  it('should return localhost if node_env is development', () => {
    process.env.NODE_ENV = 'development';
    expect(getEnvironment()).toEqual(ENVIRONMENT.LOCALHOST);
  });
  it('should return staging if micros_env is ddev', () => {
    process.env.NODE_ENV = 'production';
    process.env.MICROS_ENV = 'ddev';
    expect(getEnvironment()).toEqual(ENVIRONMENT.STAGING);
  });
  it('should return production if micros_env is dev-west2', () => {
    process.env.NODE_ENV = 'production';
    process.env.MICROS_ENV = 'dev-west2';
    expect(getEnvironment()).toEqual(ENVIRONMENT.PROD);
  });
  it('should return localhost as a fallback if not in CI and micros_env is undefined and node_env is not dev', () => {
    process.env.NODE_ENV = 'production';
    process.env.MICROS_ENV = undefined;
    process.env.CI = undefined;
    expect(getEnvironment()).toEqual(ENVIRONMENT.LOCALHOST);
  });
});

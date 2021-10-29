import { ENVIRONMENT, getEnvironment, serviceUrl } from './constants';

describe('getEnvironment', () => {
  const initialNodeEnv = process.env.NODE_ENV;
  const initialMicrosEnv = process.env.MICROS_ENV;
  const initialCI = process.env.CI;
  const initialServiceUrl = process.env.RELEASE_DASHBOARD_URL;
  afterEach(() => {
    process.env.NODE_ENV = initialNodeEnv;
    process.env.MICROS_ENV = initialMicrosEnv;
    process.env.CI = initialCI;
    process.env.RELEASE_DASHBOARD_URL = initialServiceUrl;
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
    process.env.RELEASE_DASHBOARD_URL = undefined;
    expect(getEnvironment()).toEqual(ENVIRONMENT.LOCALHOST);
  });
  it('should return production in CI if micros_env is undefined and node_env is not dev and dashboard URL matches production service URL', () => {
    process.env.NODE_ENV = undefined;
    process.env.MICROS_ENV = undefined;
    process.env.CI = 'true';
    process.env.RELEASE_DASHBOARD_URL = serviceUrl(ENVIRONMENT.PROD);
    expect(getEnvironment()).toEqual(ENVIRONMENT.PROD);
  });
  it('should return staging in CI if micros_env is undefined and node_env is not dev and dashboard URL matches staging service URL', () => {
    process.env.NODE_ENV = undefined;
    process.env.MICROS_ENV = undefined;
    process.env.CI = 'true';
    process.env.RELEASE_DASHBOARD_URL = serviceUrl(ENVIRONMENT.STAGING);
    expect(getEnvironment()).toEqual(ENVIRONMENT.STAGING);
  });
});

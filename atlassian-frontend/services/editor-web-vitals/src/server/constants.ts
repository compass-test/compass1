import path from 'path';

export const PORT = 8080;
export const STATIC_ASSETS_PATH =
  process.env.LOCAL === 'true'
    ? path.join(__dirname, '../../dist/static')
    : path.join(__dirname, '../static');

export const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  RECEIVED: 'received',
};
export const BASE_API = '/api/v1';

export enum ENVIRONMENT {
  LOCALHOST = 'localhost',
  STAGING = 'staging',
  PROD = 'production',
}

export const getEnvironment = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return ENVIRONMENT.LOCALHOST;
  }
  if (process.env.MICROS_ENV === 'dev-west2') {
    return ENVIRONMENT.PROD;
  }
  if (process.env.MICROS_ENV === 'ddev') {
    return ENVIRONMENT.STAGING;
  }

  console.error('Could not identify environment. Falling back to localhost.');
  return ENVIRONMENT.LOCALHOST;
};

export const serviceUrl = (env?: ENVIRONMENT) => {
  switch (env || getEnvironment()) {
    case ENVIRONMENT.LOCALHOST:
      return 'http://localhost:8080';
    case ENVIRONMENT.STAGING:
      return 'https://editor-web-vitals.ap-southeast-2.dev.atl-paas.net';
    case ENVIRONMENT.PROD:
      return 'https://editor-web-vitals.us-west-2.dev.atl-paas.net';
  }
};

export const EDITOR_WEB_VITALS_API_BASE_URL = `${serviceUrl()}/${BASE_API}`;

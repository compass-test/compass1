export const PRODUCTION = process.env.NODE_ENV === 'production';
export const MICROS_PROD = process.env.MICROS_ENV === 'prod-west';

export const initMicros = () => {
  const { MICROS_ENV, MICROS_ENVTYPE } = process.env;

  if (!MICROS_ENV || !MICROS_ENVTYPE) {
    throw new Error('Micros variables are not set');
  }

  return {
    ENV: MICROS_ENV,
    ENVTYPE: MICROS_ENVTYPE,
  };
};

export const initDB = () => {
  const {
    PG_AF_SERVICE_DASHBOARD_HOST,
    PG_AF_SERVICE_DASHBOARD_PORT,
    PG_AF_SERVICE_DASHBOARD_ROLE,
    PG_AF_SERVICE_DASHBOARD_PASSWORD,
    PG_AF_SERVICE_DASHBOARD_SCHEMA,
  } = process.env;

  if (
    !PG_AF_SERVICE_DASHBOARD_HOST ||
    !PG_AF_SERVICE_DASHBOARD_PORT ||
    !PG_AF_SERVICE_DASHBOARD_ROLE ||
    !PG_AF_SERVICE_DASHBOARD_PASSWORD ||
    !PG_AF_SERVICE_DASHBOARD_SCHEMA
  ) {
    throw new Error('DB variables are not set');
  }

  return {
    HOST: PG_AF_SERVICE_DASHBOARD_HOST,
    PORT: PG_AF_SERVICE_DASHBOARD_PORT,
    USERNAME: PG_AF_SERVICE_DASHBOARD_ROLE,
    PASSWORD: PG_AF_SERVICE_DASHBOARD_PASSWORD,
    DATABASE_NAME: PG_AF_SERVICE_DASHBOARD_SCHEMA,
  };
};

export const initBB = () => {
  const { BITBUCKET_USERNAME, BITBUCKET_PASSWORD } = process.env;

  if (!BITBUCKET_USERNAME || !BITBUCKET_PASSWORD) {
    throw new Error('Bitbucket variables are not set');
  }

  return {
    USERNAME: BITBUCKET_USERNAME,
    PASSWORD: BITBUCKET_PASSWORD,
  };
};

export const initSlack = () => {
  const { AFP_SLACK_TOKEN } = process.env;

  if (!AFP_SLACK_TOKEN) {
    throw new Error('Slack variables are not set');
  }

  return {
    TOKEN: AFP_SLACK_TOKEN,
  };
};

export const initMeta = () => {
  const { BUILD_NUMBER, VERSION } = process.env;

  if (!BUILD_NUMBER || !VERSION) {
    throw new Error('Meta variables are not set');
  }

  return {
    BUILD_NUMBER,
    VERSION,
  };
};

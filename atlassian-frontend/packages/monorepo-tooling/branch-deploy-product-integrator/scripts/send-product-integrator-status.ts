/**
 * Sends the status of the integrator build to the `@af/af-product-integration` service.
 * Type of Interface, we send to the service
 * interface RequestBody {
 *  resultUrl: string;
 *  product: string;
 *  isSuccessful: boolean;
 *  commit: string;
 *  buildNumber: number;
 *  branchName: string;
 *  numPackagesInstalled?: number;
 * }
 * * product - the product the integrator is associated with, should match an ID in the af-product-integration service configuration
 * * ASAP password for production and staging to authenticate with the af-product-integration service
 * * STAGING - if set to true, will target the staging service
 */
/* eslint-disable no-console */
import axios from 'axios';
import httpleaseAsap from 'httplease-asap';

import { readVariable } from '../src/lib/util';

async function returnNumPkgsInstalled() {
  return Number(await readVariable('numPackagesInstalled')) || 0;
}

type EnvironmentVariables = {
  ASAP_PI_PROD?: string;
  ASAP_PI_STAGING?: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_BUILD_NUMBER: string;
  BITBUCKET_BRANCH: string;
  BITBUCKET_COMMIT: string;
  BITBUCKET_EXIT_CODE: string;
  PRODUCT: string;
};

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
): env is EnvironmentVariables {
  return !!(
    env.BITBUCKET_BUILD_NUMBER &&
    env.BITBUCKET_REPO_FULL_NAME &&
    env.BITBUCKET_BRANCH &&
    env.BITBUCKET_COMMIT &&
    env.BITBUCKET_EXIT_CODE
  );
}

if (!validateEnvironmentVariables(process.env)) {
  throw new Error('Pipelines variables are not set');
}

const {
  ASAP_PI_PROD,
  ASAP_PI_STAGING,
  BITBUCKET_BUILD_NUMBER,
  BITBUCKET_BRANCH,
  BITBUCKET_COMMIT,
  BITBUCKET_EXIT_CODE,
  BITBUCKET_REPO_FULL_NAME,
  PRODUCT,
} = process.env;

async function main() {
  if (!ASAP_PI_PROD || !ASAP_PI_STAGING) {
    throw new Error(
      'You need to pass an ASAP token to communicate with the `@af/af-product-integration` service.',
    );
  }

  const baseUrl = `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}`;

  let integratorUrl =
    'https://af-product-integration.us-east-1.prod.atl-paas.net/integrator-status';
  let asapPassword = ASAP_PI_PROD;

  if (process.env.STAGING === 'true') {
    integratorUrl =
      'https://af-product-integration.us-east-1.staging.atl-paas.net/integrator-status';
    asapPassword = ASAP_PI_STAGING;
  }

  const buildNumber = Number(BITBUCKET_BUILD_NUMBER);

  const resultUrl = `${baseUrl}/pipelines/${BITBUCKET_BUILD_NUMBER}`;

  const isSuccessful = BITBUCKET_EXIT_CODE === '0';

  const product = PRODUCT;

  const numPackagesInstalled = await returnNumPkgsInstalled();

  const jwtConfig = Object.assign(
    {
      issuer: 'micros/af-product-integration',
      audience: 'micros/af-product-integration',
    },
    httpleaseAsap.parseDataUri(asapPassword),
  );

  const authHeader = httpleaseAsap.createAuthHeaderGenerator(jwtConfig)();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  };

  const body = {
    buildNumber,
    resultUrl,
    isSuccessful,
    branchName: BITBUCKET_BRANCH,
    commit: BITBUCKET_COMMIT,
    numPackagesInstalled,
    product,
  };

  return axios.post(integratorUrl, body, config);
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

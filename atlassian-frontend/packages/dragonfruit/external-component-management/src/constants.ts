import {
  Environment,
  getEnvironmentFromOrigin,
} from '@atlassian/dragonfruit-tenant-context';

const environment = getEnvironmentFromOrigin();
const CONNECT_BASE_URL =
  environment === Environment.PROD
    ? 'https://compass-bitbucket-connect.services.atlassian.com'
    : 'https://compass-bitbucket-connect.stg.services.atlassian.com';

const CONFIG_AS_CODE_FILE_NAME = 'compass.yml';
const CONFIG_AS_CODE_DAC_LINK =
  'https://go.atlassian.com/compass-config-as-code';
const BITBUCKET_INTEGRATION_DAC_LINK =
  'https://go.atlassian.com/compass-bitbucket-integration';

// This list contains all app IDs that are used for config-as-code.
// It will be replaced in COMPASS-4513 when we implement a Forge module for config-as-code.
const CONFIG_AS_CODE_APP_IDS = [
  'ari:cloud:ecosystem::app/850b06ff-7674-43fc-b235-27f068978293', // Ryan's Github dev app
  'ari:cloud:ecosystem::app/d52a0e79-c651-406f-b7fc-8a90497136a5', // Henry's Github dev app
  'ari:cloud:ecosystem::app/aa1f8098-1d6f-4246-abe2-3e45dadacab0', // Matt's Github dev app
  'ari:cloud:ecosystem::app/dc8d61fc-c575-48d1-ab2a-a3f7921b5be1', // Kelly's Bitbucket dev app
  'ari:cloud:ecosystem::app/ef78dc8c-2887-43d3-8732-b00cd2f193bc', // Patrick's Bitbucket dev app
  'ari:cloud:ecosystem::app/86509f0f-8141-475a-bd8a-2f53b8a89108', // Ryan's Bitbucket dev app
  'ari:cloud:ecosystem::app/89ae44dd-e7e3-4e4e-b63e-4f83f1b317ed', // Bitbucket staging app
  'ari:cloud:ecosystem::app/05175914-734f-4887-b303-4ad44d6c3a34', // Bitbucket production app
];

export {
  CONNECT_BASE_URL,
  CONFIG_AS_CODE_APP_IDS,
  CONFIG_AS_CODE_FILE_NAME,
  CONFIG_AS_CODE_DAC_LINK,
  BITBUCKET_INTEGRATION_DAC_LINK,
};

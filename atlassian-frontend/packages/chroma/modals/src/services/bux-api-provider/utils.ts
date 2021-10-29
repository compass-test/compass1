import { CloudParamOptions } from './types';

const BASE_URL = '/gateway/api/billing-ux';

export const injectCloudParams = (options: CloudParamOptions): string => {
  const { org, cloudId } = options;
  if (org) {
    return `/organization/${org}`;
  }
  if (cloudId) {
    return `/cloud/${cloudId}`;
  }
  return '';
};

export const buildUrl = (url: string, options: CloudParamOptions = {}) => {
  return `${BASE_URL}${injectCloudParams(options)}${url}`;
};

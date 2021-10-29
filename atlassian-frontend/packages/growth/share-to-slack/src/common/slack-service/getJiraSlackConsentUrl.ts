import type { Environment } from '../types';

import { SOURCE } from './constants';
import getEnvironment from './getEnvironment';

const consentUrl: {
  [key in Environment]: string;
} = {
  prod: `https://atlassian-slack-integration.services.atlassian.com/api/slack/login?source=${SOURCE}`,
  staging: `https://atlassian-slack-integration.stg.services.atlassian.com/api/slack/login?source=${SOURCE}`,
};

export default function getJiraSlackConsentUrl(
  location: Pick<Location, 'hostname' | 'pathname'>,
) {
  const environment = getEnvironment(location.hostname);

  return consentUrl[environment];
}

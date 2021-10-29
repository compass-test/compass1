import {
  getBrowserNameFromLabel,
  isBrowserStackEnvironment,
} from './browserstack-status';
import { getSessionIdentifier } from '../clients/desktop/browserstack';
import { AnalyticsEventPayload } from '@atlaskit/build-reporting';

export async function modifyBranchName(properties: AnalyticsEventPayload) {
  if (isBrowserStackEnvironment()) {
    const BS_SESSION_ID = getSessionIdentifier();
    properties.branch = BS_SESSION_ID;
    // Properties is mutated
    return true;
  }
  return false;
}

export async function modifyBrowserName(properties: AnalyticsEventPayload) {
  // e.g.  [ 'index.ts', 'Windows 10 edge 91.0' ]
  const ancestorTitles = [...properties.ancestorTitles];
  ancestorTitles.shift();
  const browserLabel = ancestorTitles.shift()!;
  properties.browser = getBrowserNameFromLabel(browserLabel);
  // Properties is mutated
  return true;
}

const modifiers = [modifyBranchName, modifyBrowserName];

export default modifiers;

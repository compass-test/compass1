import { AnalyticsEventPayload } from '@atlaskit/build-reporting';

export async function modifyBrowserName(properties: AnalyticsEventPayload) {
  // We only run Chrome for our Puppeteer tests, so here we hard code the browser
  properties.browser = 'chrome';
  // Properties is mutated
  return true;
}

const modifiers = [modifyBrowserName];

export default modifiers;

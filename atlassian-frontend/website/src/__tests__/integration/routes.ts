import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlAnalyticsDeprecated = 'http://localhost:9000/packages/core/analytics';
const urlAnalytics = 'http://localhost:9000/packages/analytics/analytics';

const app = '#app';

BrowserTestCase(
  'routes.ts: The deprecated analytics URL should successfully redirect to packages/analytics/analytics',
  {},
  async (client: any) => {
    const homeTest = new Page(client);
    await homeTest.goto(urlAnalyticsDeprecated);
    await homeTest.waitForSelector(app);

    expect(await homeTest.url()).toBe(urlAnalytics);
  },
);

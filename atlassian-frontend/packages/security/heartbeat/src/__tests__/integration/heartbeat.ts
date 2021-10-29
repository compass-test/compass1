import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const heartbeatUrl = getExampleUrl(
  'security',
  'heartbeat',
  'basic',
  'http://127.0.0.1:9000',
);

/* Css used for the test */
const heartbeatDisplayNextCall =
  '[data-test-id="heartbeat_display_nextcalltimestamp"]';
const heartbeatSessionExpiry =
  '[data-test-id="heartbeat_display_sessionexpirytimestamp"]';

const isIsoTimestamp = (timestamp: string) =>
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(
    timestamp,
  );

BrowserTestCase(
  'After calling the api initially it renders timestamp when to call the api next and when the session will expire',
  {},
  async (client: any) => {
    const page = new Page(client);

    await page.goto(heartbeatUrl);

    await page.waitUntil(async () => {
      await page.waitForSelector(heartbeatDisplayNextCall);
      await page.waitForSelector(heartbeatSessionExpiry);

      const nextCallTimeStamp = await page.getText(heartbeatDisplayNextCall);
      const sessionExpiryTimestamp = await page.getText(heartbeatSessionExpiry);
      return (
        isIsoTimestamp(nextCallTimeStamp) &&
        isIsoTimestamp(sessionExpiryTimestamp)
      );
    });
  },
);

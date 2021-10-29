import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const testUrl = getExampleUrl('identity', 'text-avatar-editor', 'basic');

/* Css selectors used for the test */
const exampleComponent = "[data-testid='text-avatar-editor-wrapper']";
const button = 'button[type="button"]';

BrowserTestCase(
  'TextAvatarEditor should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    await componentTest.waitForSelector(button);
    await componentTest.click(button);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

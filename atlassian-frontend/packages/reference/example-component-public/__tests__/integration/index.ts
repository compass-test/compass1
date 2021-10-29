import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page, { BrowserObject } from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const testUrl = getExampleUrl('reference', 'example-component-public', 'basic');

/* Css selectors used for the test */
const exampleComponent = "[data-testid='example-component']";

BrowserTestCase(
  'ExampleComponentPublic should be able to be identified by data-testid',
  {},
  async (client: BrowserObject) => {
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

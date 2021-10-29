import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const testUrl = getExampleUrl(
  'proforma',
  'proforma-jira-data-connections',
  'load-data-connections',
);

/* Css selectors used for the test */
const exampleComponent = "[data-testid='proforma-jira-data-connections']";

BrowserTestCase(
  'ProformaJiraDataConnections should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

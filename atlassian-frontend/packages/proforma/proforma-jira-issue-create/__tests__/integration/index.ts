import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

BrowserTestCase(
  'ProformaIssueCreate should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-jira-issue-create',
      'load-issue-create',
    );

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='proforma-jira-issue-create']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'ProformaIssueCreateDirect should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-jira-issue-create',
      'load-issue-create-direct',
    );

    /* Css selectors used for the test */
    const exampleComponent =
      "[data-testid='proforma-jira-issue-create-direct']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

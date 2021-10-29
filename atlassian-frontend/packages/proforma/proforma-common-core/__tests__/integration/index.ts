import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

BrowserTestCase(
  'ProForma HowFormsWork should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'how-forms-work',
    );
    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='proforma-how-forms-work']";
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'ProForma ExportJiraFieldsModal should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'export-jira-fields-modal',
    );
    /* Css selectors used for the test */
    const exampleComponent =
      "[data-testid='proforma-export-jira-fields-modal']";
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

/* Css selectors used for the test */
const exampleComponent = "[data-testid='proforma-list-project-forms']";

BrowserTestCase(
  'ProForma ListProjectForms with nested intl should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'list-project-forms-nested-intl',
    );
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'ProForma ListProjectForms with custom nested intl should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'list-project-forms-custom-nested-intl',
    );
    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

BrowserTestCase(
  'PaginatedPickerSingle should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl('jira', 'paginated-picker', 'single-options');

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='paginated-picker-single']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'PaginatedPickerInvalid should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'jira',
      'paginated-picker',
      'invalid-selection',
    );

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='paginated-picker-invalid']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'PaginatedPickerGrouped should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'jira',
      'paginated-picker',
      'grouped-options',
    );

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='paginated-picker-grouped']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'PaginatedPickerAvatar should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl('jira', 'paginated-picker', 'avatar-options');

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='paginated-picker-avatar']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'PaginatedPickerLozenge should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'jira',
      'paginated-picker',
      'lozenge-options',
    );

    /* Css selectors used for the test */
    const exampleComponent = "[data-testid='paginated-picker-lozenge']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

BrowserTestCase(
  'PaginatedPickerGroupedSelectedNotFirst should be able to be identified by data-testid',
  { skip: ['edge'] },
  async (client: any) => {
    /* Url to test the example */
    const testUrl = getExampleUrl(
      'jira',
      'paginated-picker',
      'grouped-options-selected-not-first',
    );

    /* Css selectors used for the test */
    const exampleComponent =
      "[data-testid='paginated-picker-grouped-selected-not-first']";

    const componentTest = new Page(client);
    await componentTest.goto(testUrl);

    // Check for visibility.
    expect(await componentTest.isVisible(exampleComponent)).toBe(true);
  },
);

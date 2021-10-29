import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { SearchDialogDriver } from '../../integration-test-utils';

BrowserTestCase(
  'Can change tabs in the dialog',
  {},
  async (client: WebdriverIO.BrowserObject) => {
    const searchDialog = new SearchDialogDriver(client);

    await searchDialog.openStorybook(
      'nav-v3-integrated-extensible-cross-product',
    );

    await searchDialog.selectWithDataTestId('search-dialog-input', {
      dataTestIdAttribute: 'data-test-id',
    });

    await searchDialog.openSearchDialog();

    const tab = await searchDialog.selectWithDataTestId(
      'search-dialog-product-tab-1',
    );

    await tab.click();

    const issueAdvancedSearchLink = await searchDialog.selectWithDataTestId(
      'search-dialog-jira-advanced-search-issues',
      { dataTestIdAttribute: 'data-test-id' },
    );

    expect(issueAdvancedSearchLink.isDisplayed()).toBeTruthy();
  },
);

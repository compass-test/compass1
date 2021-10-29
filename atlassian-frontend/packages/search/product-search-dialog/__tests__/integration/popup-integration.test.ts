import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { SearchDialogDriver } from '../../integration-test-utils';

BrowserTestCase(
  'Opening search dialog closes popups',
  {
    // FIXME: This test was automatically skipped due to failure on 9/17/2021: https://product-fabric.atlassian.net/browse/QS-2497
    skip: ['*'],
  },
  async (client: WebdriverIO.BrowserObject) => {
    const storybook = new SearchDialogDriver(client);

    await storybook.openStorybook('nav-v3-integrated-extensible-cross-product');

    // Open a popup
    const popupTrigger = await storybook.selectWithDataTestId(
      'nav-bar-activity',
    );
    await popupTrigger.click();

    // Assert that the popup exists
    const popupContent = await storybook.selectWithDataTestId('empty-content', {
      dataTestIdAttribute: 'data-test-id',
    });
    expect(await popupContent.isDisplayed()).toBeTruthy();

    await storybook.openSearchDialog();

    // Assert that the popup does not exist
    expect(await popupContent.isDisplayed()).toBeFalsy();
  },
);

BrowserTestCase(
  'Opening popup closes search dialog',
  {},
  async (client: WebdriverIO.BrowserObject) => {
    const storybook = new SearchDialogDriver(client);

    await storybook.openStorybook('nav-v3-integrated-extensible-cross-product');

    const searchDialog = await storybook.openSearchDialog();

    // Open a popup
    const popupTrigger = await storybook.selectWithDataTestId(
      'nav-bar-activity',
    );
    await popupTrigger.click();

    // Assert that the popup does not exist
    const popupContent = await storybook.selectWithDataTestId('empty-content', {
      dataTestIdAttribute: 'data-test-id',
    });
    expect(await popupContent.isDisplayed()).toBeTruthy();

    // Assert that the search dialog closed
    expect(await searchDialog.isDisplayed()).toBeFalsy();
  },
);

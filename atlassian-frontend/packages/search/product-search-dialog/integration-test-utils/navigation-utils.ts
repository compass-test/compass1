import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

export class SearchDialogDriver {
  client: WebdriverIO.BrowserObject;

  constructor(client: WebdriverIO.BrowserObject) {
    this.client = client;
  }

  openStorybook = async (storybookName: string) => {
    await this.client.maximizeWindow();

    const storybook = new Page(this.client);
    const exampleUrl = getExampleUrl(
      'search',
      'product-search-dialog',
      storybookName,
    );
    await storybook.goto(exampleUrl);

    return storybook;
  };

  openSearchDialog = async () => {
    const input = await this.selectWithDataTestId('search-dialog-input', {
      dataTestIdAttribute: 'data-test-id',
    });
    await input.click();

    const searchDialog = await this.selectWithDataTestId(
      'search-dialog-dialog-wrapper',
      { dataTestIdAttribute: 'data-test-id' },
    );
    expect(await searchDialog.isDisplayed()).toBeTruthy();

    return searchDialog;
  };

  /**
   * Select an element using the data-testid attribute. The test id attribute may be overridden,
   * due to inconsistent naming (data-testid vs data-test-id). The former is prefered, see
   * https://testing-library.com/docs/queries/bytestid/#overriding-data-testid
   * @param dataTestId the data-testid to search for
   * @param options.dataTestIdAttribute (Optional) the name of the data-testid attribute to override (e.g. data-test-id)
   * @param options.waitForMs (Optional) the time, in ms, to wait for the data test id to be seen in the dom. If not specified, the selector does not wait
   */
  selectWithDataTestId = async (
    dataTestId: string,
    options?: { dataTestIdAttribute?: string; waitForMs?: number },
  ) => {
    const attribute = options?.dataTestIdAttribute || 'data-testid';
    const element = await this.client.$(`[${attribute}="${dataTestId}"]`);

    if (options?.waitForMs) {
      await element.waitForExist({
        timeout: options.waitForMs,
      });
    }
    return element;
  };
}

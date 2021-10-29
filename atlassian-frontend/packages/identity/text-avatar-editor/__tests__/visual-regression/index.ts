import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

/* Css selectors used for the test */
const button = 'button[type="button"]';
const editor = '[data-testid="text-avatar-editor-wrapper"]';

describe('Snapshot Test', () => {
  it('TextAvatarEditor basic example should match production example', async () => {
    const url = getExampleUrl(
      'identity',
      'text-avatar-editor',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);

    await page.waitForSelector(button);
    await page.click(button);

    await page.setViewport({ width: 800, height: 700 });

    await page.waitForSelector(editor);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('TextAvatarEditor basic example should match production example with warning', async () => {
    const url = getExampleUrl(
      'identity',
      'text-avatar-editor',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);

    await page.waitForSelector(button);
    await page.click(button);

    await page.setViewport({ width: 800, height: 700 });

    await page.waitForSelector(editor);

    const submit = '[data-testid="update-button"]';
    await page.click(submit);

    const error = '[data-testid="text-input-warning"]';
    await page.waitForSelector(error);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('TextAvatarEditor hidden-link example should match production example', async () => {
    const url = getExampleUrl(
      'identity',
      'text-avatar-editor',
      'hidden-link',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);

    await page.waitForSelector(button);
    await page.click(button);

    await page.setViewport({ width: 800, height: 700 });

    await page.waitForSelector(editor);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});

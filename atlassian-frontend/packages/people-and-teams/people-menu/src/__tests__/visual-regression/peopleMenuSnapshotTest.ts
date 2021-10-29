import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
  waitForLoadedImageElements,
} from '@atlaskit/visual-regression/helper';

const peoplePrimaryMenu = '[data-testid="menu-people-primary-button"]';
const wrapperWithLoadedData = '[data-testid="menu-group-loaded"]';

describe('Snapshot Test', () => {
  it('PeopleMenu should match with snapshot', async () => {
    const url = getExampleUrl(
      'people-and-teams',
      'people-menu',
      'default-with-mocked-data',
      global.__BASEURL__,
    );

    const { page } = global;
    await page.setViewport({ width: 800, height: 1024 });
    await loadPage(page, url);
    await page.waitForSelector(peoplePrimaryMenu);
    await page.click(peoplePrimaryMenu);
    await page.waitForSelector(wrapperWithLoadedData);
    await waitForLoadedImageElements(page, 5000);

    const image = await takeElementScreenShot(page, wrapperWithLoadedData);
    expect(image).toMatchProdImageSnapshot();
  });
});

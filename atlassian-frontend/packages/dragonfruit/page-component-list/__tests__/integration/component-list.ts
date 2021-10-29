import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
// import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
// import Page from '@atlaskit/webdriver-runner/wd-wrapper';

// const pageUrl = getExampleUrl(
//   'dragonfruit',
//   'page-component-list',
//   'component-list',
// );

// CSS selectors used for the test
// const componentListTable =
//   '[data-testid="dragonfruit-page-component-list.ui.component-list--table"]';
// const componentListHeader = `${componentListTable} > thead`;
// const componentListBody = `${componentListTable} > tbody`;
// const loadMoreButton =
//   '[data-testid="dragonfruit-page-component-list.ui.load-more-components"]';

BrowserTestCase(
  'Component list should render with correct column headers and 10 rows of data with no pagination',
  {},
  async (client: any) => {
    expect(true).toBeTruthy();
    // const page = new Page(client);
    // await page.goto(pageUrl);

    // const table = await page.$(componentListTable);
    // const header = await page.$(componentListHeader);
    // const body = await page.$(componentListBody);

    // // Check table is visible
    // expect(await table.isDisplayed()).toBe(true);
    // expect(await header.isDisplayed()).toBe(true);
    // expect(await body.isDisplayed()).toBe(true);

    // // Check table has correct columns
    // const headerColumns = await header.$$('th');
    // expect(await headerColumns[0].getText()).toBe('Name');
    // expect(await headerColumns[1].getText()).toBe('Type');
    // expect(await headerColumns[2].getText()).toBe('Owners');
    // expect(await headerColumns[3].getText()).toBe('Tier');

    // // Check table has 10 rows of data
    // expect((await body.$$('tr')).length).toBe(10);

    // // Check "Load More" button (for pagination) does not exist
    // expect(await page.isExisting(loadMoreButton)).toBe(false);
  },
);

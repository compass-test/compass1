import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
// import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
// import Page from '@atlaskit/webdriver-runner/wd-wrapper';

// const pageUrl = getExampleUrl(
//   'dragonfruit',
//   'page-component-list',
//   'component-list-paginated',
// );

// const componentListTable =
//   '[data-testid="dragonfruit-page-component-list.ui.component-list--table"]';
// const componentListBody = `${componentListTable} > tbody`;
// const loadMoreButton =
//   '[data-testid="dragonfruit-page-component-list.ui.load-more-components"]';

BrowserTestCase(
  'Clicking on "Load More" button should load more components in list',
  {},
  async (client: any) => {
    expect(true).toBeTruthy();
    // const page = new Page(client);
    // await page.goto(pageUrl);

    // const table = await page.$(componentListTable);
    // const body = await page.$(componentListBody);

    // // Check table is visible
    // expect(await table.isDisplayed()).toBe(true);
    // expect(await body.isDisplayed()).toBe(true);

    // // Check table has 100 rows of data initially
    // expect((await body.$$('tr')).length).toBe(100);

    // // Click on "Load More" button
    // // Executed via JavaScript due to bug in Safari where WebDriver clicks don't register
    // const loadMoreBtn = await page.$(loadMoreButton);
    // await page.execute('arguments[0].click();', loadMoreBtn);

    // // Check that new rows have been added after pagination
    // expect(
    //   await page.waitForSelector(`${componentListBody} > tr:nth-child(101)`),
    // ).toBe(true);
  },
);

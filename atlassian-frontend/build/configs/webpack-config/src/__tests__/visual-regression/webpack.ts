import {
  PuppeteerPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const app = '#app';
const atlaskitTitle = 'h1[data-testid="title"]';

describe('Webpack Website Snapshot Test', () => {
  let page: PuppeteerPage;
  let url: string;

  beforeAll(async () => {
    url = global.__BASEURL__;
    page = global.page;
    await page.goto(url, { waitUntil: ['networkidle0', 'domcontentloaded'] });
    await page.waitForSelector(app);
    await page.waitForSelector(atlaskitTitle);
  });

  it('Home page title should match production', async () => {
    const image = await takeElementScreenShot(page, atlaskitTitle);
    expect(image).toMatchProdImageSnapshot();
  });
});

import { BrowserTestCase } from '../../runner';
import Page from '../../lib/wrapper/wd-wrapper';

const urlHome = 'http://localhost:9000/';

const app = '#app';
const atlaskitLogo = '[alt="Atlaskit logo"]';
const atlaskitTitle = 'h1[data-testid="title"]';

BrowserTestCase(
  'The website home page should be displayed without errors when changing the webdriver-runner',
  {},
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlHome);
    // Windows is adding scrollbar due to which the width is wrecked
    // catering for the scroll bar width
    await page.setWindowSize(1980, 1200);
    await page.waitForSelector(app);
    const titleIsVisible = await page.isVisible(atlaskitTitle);
    const titleText = await page.getText(atlaskitTitle);
    const logo = await page.isVisible(atlaskitLogo);

    expect(logo).toBe(true);
    expect(titleIsVisible).toBe(true);
    expect(titleText).toBe('Atlaskit');
    await page.checkConsoleErrors();
  },
);

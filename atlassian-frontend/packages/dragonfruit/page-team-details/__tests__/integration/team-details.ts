import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const pageUrl = getExampleUrl('dragonfruit', 'page-team-details', 'team-page');

/* Css attribute selectors used for the test */
/* page header does not have testId */
const teamName = '[data-testid="dragonfruit-page-team-details.ui.team-name"]';
const componentTable =
  '[data-testid="dragonfruit-components.ui.component-list-teams-page--table"]';

BrowserTestCase(
  'page should display correct team name',
  { skip: [] },
  async (client: any) => {
    const page = new Page(client);
    await page.goto(pageUrl);
    expect(await (await page.getText(teamName)).includes('Compass team'));
  },
);

BrowserTestCase(
  'page displays the microservice owned by the team',
  { skip: [] },
  async (client: any) => {
    const page = new Page(client);
    await page.goto(pageUrl);
    expect(await page.isExisting(componentTable)).toBe(true);
  },
);

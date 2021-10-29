import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import { getRadioForGroup } from './_helper';
/* Url to test the example */
const urlDropdown = getExampleUrl(
  'design-system',
  'new-dropdown-menu',
  'dropdown-menu-default',
);

const urlDropdownStateless = getExampleUrl(
  'design-system',
  'new-dropdown-menu',
  'lite-mode-ddm-stateless',
);

/* Css selectors used for the test */
const trigger = '[data-testid="lite-mode-ddm-trigger"]';
const dropdownMenu = '[data-testid="lite-mode-ddm"]';

BrowserTestCase(
  'Verify that Dropdown Menu is able to open',
  {},
  async (client: WebdriverIO.BrowserObject) => {
    const page = new Page(client);
    await page.goto(urlDropdown);

    await page.waitForSelector(trigger);
    await page.click(trigger);

    expect(await page.isExisting(dropdownMenu)).toBe(true);
  },
);

BrowserTestCase(
  'Verify that Dropdown Menu is able to open - stateless',
  {},
  async (client: WebdriverIO.BrowserObject) => {
    const page = new Page(client);
    await page.goto(urlDropdownStateless);

    await page.waitForSelector(trigger);
    await page.click(trigger);

    expect(await page.isExisting(dropdownMenu)).toBe(true);

    await page.waitForSelector('button[aria-checked]');
    expect(await page.isExisting('button[aria-checked]')).toBe(true);

    let checks = await getRadioForGroup(page, 'cities');
    expect(checks).toEqual(['true', 'false']);
  },
);

import { BrowserTestCase } from '@atlaskit/webdriver-runner/lib/runner/runner';
import Page from '@atlaskit/webdriver-runner/lib/wrapper/wd-wrapper';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

const pageUrl = getExampleUrl(
  'dragonfruit',
  'scorecards',
  'remove-scorecard-from-component-modal',
);

BrowserTestCase(
  'Remove Scorecard - Should be successful',
  {},
  async (browser) => {
    const page = new Page(browser);
    await page.goto(pageUrl);

    const removeScorecardModal = "[data-testid='remove-scorecard-modal']";
    expect(await page.isVisible(removeScorecardModal)).toBe(true);

    const removeButton =
      "[data-testid='dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button']";
    await page.click(removeButton);

    const successFlag =
      "[data-testid='dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-success-flag']";
    expect(await page.isVisible(successFlag)).toBe(true);
  },
);

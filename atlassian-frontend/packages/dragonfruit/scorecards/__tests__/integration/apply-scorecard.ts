import { BrowserTestCase } from '@atlaskit/webdriver-runner/lib/runner/runner';
import Page from '@atlaskit/webdriver-runner/lib/wrapper/wd-wrapper';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

const pageUrl = getExampleUrl(
  'dragonfruit',
  'scorecards',
  'apply-scorecard-modal',
);

BrowserTestCase(
  'Apply Scorecard - Should be successful',
  {},
  async (browser) => {
    const page = new Page(browser);
    await page.goto(pageUrl);

    const applyScorecardModal = "[data-testid='apply-scorecard-modal-test-id']";
    expect(await page.isVisible(applyScorecardModal)).toBe(true);

    const applicableScorecardsSelect =
      "[data-testid='dragonfruit-apply-scorecard-modal.ui.scorecards-select']";
    await page.click(applicableScorecardsSelect);

    const option = '.applicable-scorecards-select__option';
    await page.click(option);

    const applyButton =
      "[data-testid='dragonfruit-apply-scorecard-modal.ui.submit-button']";
    await page.click(applyButton);

    const successFlag =
      "[data-testid='dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag']";
    expect(await page.isVisible(successFlag)).toBe(true);
  },
);

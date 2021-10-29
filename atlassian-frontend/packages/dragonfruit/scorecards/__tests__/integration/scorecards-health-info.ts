import { BrowserTestCase } from '@atlaskit/webdriver-runner/lib/runner/runner';
import Page from '@atlaskit/webdriver-runner/lib/wrapper/wd-wrapper';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

const pageUrl = getExampleUrl(
  'dragonfruit',
  'scorecards',
  'scorecards-health-info',
);

BrowserTestCase(
  'Scorecards health info - render should be successful',
  {},
  async (browser) => {
    const page = new Page(browser);
    await page.goto(pageUrl);

    const scorecardsHealthInfo =
      "[data-testid='dragonfruit-scorecards.ui.scorecards-health-info-scorecards-summary']";
    expect(await page.isVisible(scorecardsHealthInfo)).toBe(true);

    const scorecardsHealthInfoIcon = "[data-testid='lowest-health-icon']";
    expect(await page.isVisible(scorecardsHealthInfoIcon)).toBe(true);

    expect(await page.getText(scorecardsHealthInfo)).toBe('4 of 10');

    await page.click(scorecardsHealthInfo);

    const scorecardsHealthInfoInlineDialog =
      "[data-testid='dragonfruit-scorecards.ui.scorecards-health-info-scorecards']";
    expect(await page.isVisible(scorecardsHealthInfoInlineDialog)).toBe(true);

    expect(await page.getText(scorecardsHealthInfoInlineDialog)).toContain(
      '4 of 10 scorecards need attention',
    );

    // Asserting the lowest health scorecard name and health %
    const lowestHealthScorecard =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-0"]';
    await page.waitForSelector(lowestHealthScorecard);
    const lowestHealthScorecardText = await page.getText(lowestHealthScorecard);
    expect(lowestHealthScorecardText).toContain('Scorecard 1');
    expect(lowestHealthScorecardText).toContain('0%');
    // Asserting the lowest health scorecard icon
    const lowestHealthIcon =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-0"] > img:first-child';
    await page.waitForSelector(lowestHealthIcon);
    expect(await page.isVisible(lowestHealthIcon));

    // Asserting the low health scorecard name and health %
    const lowHealthScorecard =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-1"]';
    await page.waitForSelector(lowHealthScorecard);
    const lowHealthScorecardText = await page.getText(lowHealthScorecard);
    expect(lowHealthScorecardText).toContain('Scorecard 2');
    expect(lowHealthScorecardText).toContain('35%');
    // Asserting the low health scorecard icon
    const lowHealthIcon =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-1"] > img:first-child';
    await page.waitForSelector(lowHealthIcon);
    expect(await page.isVisible(lowHealthIcon));

    // Asserting the medium health scorecard name and health %
    const mediumHealthScorecard =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-2"]';
    await page.waitForSelector(mediumHealthScorecard);
    const mediumHealthScorecardText = await page.getText(mediumHealthScorecard);
    expect(mediumHealthScorecardText).toContain('Scorecard 3');
    expect(mediumHealthScorecardText).toContain('55%');
    // Asserting the medium health scorecard icon
    const mediumHealthIcon =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-2"] > img:first-child';
    await page.waitForSelector(mediumHealthIcon);
    expect(await page.isVisible(mediumHealthIcon));

    // Asserting the high health scorecard name and health %
    const highHealthScorecard =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-3"]';
    await page.waitForSelector(highHealthScorecard);
    const highHealthScorecardText = await page.getText(highHealthScorecard);
    expect(highHealthScorecardText).toContain('Scorecard 4');
    expect(highHealthScorecardText).toContain('75%');
    // Asserting the high health scorecard icon
    const highHealthIcon =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-3"] > img:first-child';
    await page.waitForSelector(highHealthIcon);
    expect(await page.isVisible(highHealthIcon));

    // Asserting the highest health scorecard name and health %
    const highestHealthScorecard =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-4"]';
    await page.waitForSelector(highestHealthScorecard);
    const highestHealthScorecardText = await page.getText(
      highestHealthScorecard,
    );
    expect(highestHealthScorecardText).toContain('Scorecard 5');
    expect(highestHealthScorecardText).toContain('100%');
    // Asserting the highest health scorecard icon
    const highestHealthIcon =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-scorecard-4"] > img:first-child';
    await page.waitForSelector(highestHealthIcon);
    expect(await page.isVisible(highestHealthIcon));

    const moreScorecardsLink =
      'div[data-testid="dragonfruit-scorecards.ui.scorecards-health-info-inline-dialog-content-more-link"] > a:first-child';
    await page.waitForSelector(moreScorecardsLink);

    expect(await page.isVisible(moreScorecardsLink)).toBe(true);
    expect(await page.getText(moreScorecardsLink)).toContain('5 more');
    await page.click(moreScorecardsLink);

    expect(await page.url()).toContain(
      'compass/component/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
    );
  },
);

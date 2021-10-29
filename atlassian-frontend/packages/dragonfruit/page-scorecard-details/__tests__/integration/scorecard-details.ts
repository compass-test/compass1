import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const pageUrl = getExampleUrl(
  'dragonfruit',
  'page-scorecard-details',
  'scorecard-details-page',
);

/* Css attribute selectors used for the test */
/* testId for the ComponentList component */
const componentTableTestId =
  'dragonfruit-page-scorecard-details.ui.component-list';
/* testId for the component row */
const rowTestId = `${componentTableTestId}.table--row-component-row`;
/* testId for the metaData */
const metaDataTestId = `dragonfruit-page-scorecard-details.ui.scorecard-metadata`;

BrowserTestCase(
  'page displays the correct scorecard information and the components.',
  { skip: [] },
  async (client: any) => {
    const page = new Page(client);
    await page.goto(pageUrl);

    // Assert scorecard name
    expect(await page.getText('#main h1')).toContain(
      'Scorecard for integration tests',
    );

    // Assert edit scorecard button
    const editButtonTestId =
      'dragonfruit-page-scorecard-details.ui.scorecard-edit.button';
    expect(await page.isExisting(`button[data-testid="${editButtonTestId}"]`));

    const scorecardMetaDataLocator = `div[data-testid="${metaDataTestId}"]`;

    // Assert scorecard importance
    expect(await page.getText(scorecardMetaDataLocator)).toContain(
      'Recommended',
    );

    // Assert scorecard owner
    expect(await page.getText(scorecardMetaDataLocator)).toContain('Li Bai');

    // Assert components
    const componentRowLocator = `tr[data-testid="${rowTestId}.cool-component"]`;

    expect(await page.isExisting(componentRowLocator)).toBe(true);

    const componentNameLocator = `${componentRowLocator} td[data-testid="${componentTableTestId}.table--cell-0"]`;
    expect(await page.getText(componentNameLocator)).toBe('Cool component');

    const componentDescriptionLocator = `${componentRowLocator} td[data-testid="${componentTableTestId}.table--cell-1"]`;
    expect(await page.getText(componentDescriptionLocator)).toBe(
      'I am a cool component',
    );

    const componentOwnerLocator = `${componentRowLocator} td[data-testid="${componentTableTestId}.table--cell-2"]`;
    expect(await page.getText(componentOwnerLocator)).toBe('Unowned');

    const componentScoreLocator = `${componentRowLocator} td[data-testid="${componentTableTestId}.table--cell-3"]`;
    expect(await page.getText(componentScoreLocator)).toBe('90%');

    // Assert another component row
    expect(
      await page.isExisting(
        `tr[data-testid="${rowTestId}.another-cool-component"]`,
      ),
    ).toBe(true);
  },
);
